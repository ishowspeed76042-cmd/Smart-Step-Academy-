import express from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const getDirname = () => {
  if (typeof __dirname !== "undefined") return __dirname;
  try {
    return path.dirname(fileURLToPath(import.meta.url));
  } catch {
    return process.cwd();
  }
};
const appDir = getDirname();

export const app = express();
const PORT = 3000;

// High limit for base64 file uploads (Student Photo + Aadhar Card)
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Enable CORS and Normalize Netlify Functions URL prefixes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Strip Netlify function path prefix if routed directly
  if (req.url.startsWith("/.netlify/functions/server")) {
    req.url = req.url.replace(/^\/\.netlify\/functions\/server/, "");
    if (!req.url.startsWith("/")) {
      req.url = "/" + req.url;
    }
  }
  next();
});

// Load configuration from keys.txt or environment variables
interface AppConfig {
  jsonbinId: string;
  jsonbinKey: string;
  imgbbKey: string;
  telegramToken: string;
  telegramGroupId: string;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  logoUrl: string;
  bannerUrl: string;
  pamphletUrl: string;
}

function loadConfig(): AppConfig {
  const defaultConfig: AppConfig = {
    jsonbinId: process.env.BIN_ID || "6a7b2227f5f4af5e29073d4e",
    jsonbinKey: process.env.MASTER_KEY || "$2a$10$AEHZO54XXagoeQhEKxz9YunSQUuxJ1sJwjC/Xu9WhPix8JNLMW0k.",
    imgbbKey: process.env.API_KEY || "1847305813bde68a183799717331cf97",
    telegramToken: process.env.BOT_TOKEN || "8712759180:AAEf1kFAwcMGBZLGLOKOJSDF_RuonPNAGo8",
    telegramGroupId: process.env.GROUP_CHAT_ID || "-1003625274749",
    smtpHost: process.env.SMTP_HOST || "smtp.gmail.com",
    smtpPort: parseInt(process.env.SMTP_PORT || "465", 10),
    smtpUser: process.env.SMTP_USER || "ishowspeed76042@gmail.com",
    smtpPass: (process.env.SMTP_PASS || "zxdamwuqqznsuqwl").replace(/\s+/g, ""),
    logoUrl: "https://i.postimg.cc/pL7xyB7d/IMG-20260811-WA0004.jpg",
    bannerUrl: "https://i.postimg.cc/3xbrmhkf/IMG-20260811-WA0005.jpg",
    pamphletUrl: "https://i.postimg.cc/zG9ZqGb8/IMG-20260811-WA0003.jpg"
  };

  const possiblePaths = [
    path.join(process.cwd(), "keys.txt"),
    path.join(appDir, "keys.txt"),
    path.join(appDir, "..", "keys.txt"),
    path.join(appDir, "../..", "keys.txt"),
    path.resolve("keys.txt")
  ];

  for (const keysPath of possiblePaths) {
    try {
      if (fs.existsSync(keysPath)) {
        const content = fs.readFileSync(keysPath, "utf-8");
        const lines = content.split("\n");
        lines.forEach((line) => {
          if (line.includes("BIN_ID =")) defaultConfig.jsonbinId = line.split("=")[1].trim();
          if (line.includes("MASTER_KEY =")) defaultConfig.jsonbinKey = line.split("=")[1].trim();
          if (line.includes("API_KEY =")) defaultConfig.imgbbKey = line.split("=")[1].trim();
          if (line.includes("BOT_TOKEN =")) defaultConfig.telegramToken = line.split("=")[1].trim();
          if (line.includes("GROUP_CHAT_ID =")) defaultConfig.telegramGroupId = line.split("=")[1].trim();
          if (line.includes("SMTP_HOST =")) defaultConfig.smtpHost = line.split("=")[1].trim();
          if (line.includes("SMTP_PORT =")) defaultConfig.smtpPort = parseInt(line.split("=")[1].trim(), 10);
          if (line.includes("SMTP_USER =")) defaultConfig.smtpUser = line.split("=")[1].trim();
          if (line.includes("SMTP_PASS =")) defaultConfig.smtpPass = line.split("=")[1].trim().replace(/\s+/g, "");
        });
        break;
      }
    } catch (err) {
      // ignore path read error
    }
  }

  return defaultConfig;
}

const config = loadConfig();

// Strict security rule: Block public web browser access to /keys.txt
app.use((req, res, next) => {
  if (req.path === "/keys.txt" || req.path.toLowerCase().endsWith("keys.txt")) {
    return res.status(403).type("text/plain").send("Access Denied: Restricted Security Configuration File.");
  }
  next();
});

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: config.smtpHost,
  port: config.smtpPort,
  secure: config.smtpPort === 465,
  auth: {
    user: config.smtpUser,
    pass: config.smtpPass,
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 8000,
  greetingTimeout: 8000,
  socketTimeout: 8000,
});

// Temporary in-memory OTP store (email -> { otp, expiresAt })
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

// Stateless HMAC Token Helpers for Serverless Compatibility
function createOtpToken(email: string, otp: string, expiresAt: number): string {
  const payloadStr = JSON.stringify({ email: email.toLowerCase().trim(), otp: otp.trim(), expiresAt });
  const secret = config.smtpPass || "smart-step-latur-otp-secret";
  const signature = crypto.createHmac("sha256", secret).update(payloadStr).digest("hex");
  const b64 = Buffer.from(payloadStr).toString("base64url");
  return `${b64}.${signature}`;
}

function verifyOtpToken(email: string, otp: string, token: string): { valid: boolean; reason?: string } {
  if (!token || !token.includes(".")) {
    return { valid: false, reason: "Invalid OTP token format" };
  }
  try {
    const [b64, signature] = token.split(".");
    const payloadStr = Buffer.from(b64, "base64url").toString("utf-8");
    const secret = config.smtpPass || "smart-step-latur-otp-secret";
    const expectedSig = crypto.createHmac("sha256", secret).update(payloadStr).digest("hex");

    if (signature !== expectedSig) {
      return { valid: false, reason: "OTP signature mismatch" };
    }

    const data = JSON.parse(payloadStr);
    if (data.email !== email.toLowerCase().trim()) {
      return { valid: false, reason: "Email does not match OTP request" };
    }
    if (data.otp !== otp.trim()) {
      return { valid: false, reason: "Invalid OTP code" };
    }
    if (Date.now() > data.expiresAt) {
      return { valid: false, reason: "OTP code has expired. Please request a new OTP." };
    }

    return { valid: true };
  } catch (err) {
    return { valid: false, reason: "Failed to decode OTP token" };
  }
}

// Helper function to upload base64 image to ImgBB
async function uploadToImgBB(base64Data: string): Promise<string | null> {
  if (!base64Data) return null;
  try {
    const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, "");
    const formData = new URLSearchParams();
    formData.append("key", config.imgbbKey);
    formData.append("image", cleanBase64);

    const res = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    const data = await res.json();
    if (data && data.success && data.data && data.data.url) {
      return data.data.url;
    }
    console.error("ImgBB upload error response:", data);
  } catch (err) {
    console.error("Failed to upload image to ImgBB:", err);
  }
  return null;
}

// Helper to send Telegram message
async function sendTelegramMessage(text: string): Promise<boolean> {
  try {
    const url = `https://api.telegram.org/bot${config.telegramToken}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: config.telegramGroupId,
        text: text,
        parse_mode: "HTML",
      }),
    });
    const data = await res.json();
    return data.ok === true;
  } catch (err) {
    console.error("Telegram error:", err);
    return false;
  }
}

// Helper to update / append record to JSONBin
async function saveToJSONBin(submissionRecord: any): Promise<boolean> {
  try {
    const getRes = await fetch(`https://api.jsonbin.io/v3/b/${config.jsonbinId}`, {
      headers: {
        "X-Master-Key": config.jsonbinKey,
      },
    });
    let currentData: any = { submissions: [], gallery: [], offers: [], videos: [] };
    if (getRes.ok) {
      const getJson = await getRes.json();
      if (getJson && getJson.record) {
        currentData = getJson.record;
      }
    }

    if (!Array.isArray(currentData.submissions)) {
      currentData.submissions = [];
    }

    currentData.submissions.unshift(submissionRecord);

    const putRes = await fetch(`https://api.jsonbin.io/v3/b/${config.jsonbinId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": config.jsonbinKey,
      },
      body: JSON.stringify(currentData),
    });

    return putRes.ok;
  } catch (err) {
    console.error("JSONBin save error:", err);
    return false;
  }
}

// Router to handle endpoints both with and without /api prefix
const apiRouter = express.Router();

apiRouter.get("/health", (req, res) => {
  res.json({
    status: "ok",
    academy: "Smart Step Academy, Latur",
    location: "Back of Dhanvantari Clinic, Pin Code: 413512",
    teachers: ["Prof. Shravan Sir", "Prof. Sham Bhole Sir"],
  });
});

apiRouter.get("/config", (req, res) => {
  res.json({
    academyName: "Smart Step Academy",
    location: "Back of Dhanvantari Clinic, Latur - 413512",
    teachers: ["Prof. Shravan Sir", "Prof. Sham Bhole Sir"],
    logoUrl: config.logoUrl,
    bannerUrl: config.bannerUrl,
    pamphletUrl: config.pamphletUrl,
    timings: "Evening 4:00 PM to 7:00 PM",
    schedule: [
      { time: "4:00 PM - 5:00 PM", subject: "English", faculty: "Prof. Shravan Sir" },
      { time: "5:00 PM - 6:00 PM", subject: "Mathematics", faculty: "Prof. Sham Bhole Sir" },
      { time: "6:00 PM - 7:00 PM", subject: "Science", faculty: "Prof. Shravan Sir & Prof. Sham Bhole Sir" },
    ],
  });
});

// 1. Send OTP Email
apiRouter.post("/send-otp", async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ success: false, message: "Valid email address is required" });
    }

    const cleanEmail = email.trim().toLowerCase();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 mins

    otpStore.set(cleanEmail, { otp, expiresAt });
    const otpToken = createOtpToken(cleanEmail, otp, expiresAt);

    const mailOptions = {
      from: `"Smart Step Academy" <${config.smtpUser}>`,
      to: cleanEmail,
      subject: `Your OTP Code: ${otp} - Smart Step Academy Latur`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #3b82f6;">
            <h1 style="color: #1e3a8a; margin: 0; font-size: 24px;">Smart Step Academy</h1>
            <p style="color: #64748b; margin-top: 4px; font-size: 14px;">Latur - Back of Dhanvantari Clinic (413512)</p>
          </div>
          <div style="padding: 24px 0;">
            <p style="font-size: 16px; color: #334155;">Hello ${name || "Student / Parent"},</p>
            <p style="font-size: 15px; color: #475569;">Your Email Verification OTP for form submission is:</p>
            <div style="text-align: center; margin: 24px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #2563eb; background: #dbeafe; padding: 12px 24px; border-radius: 8px; border: 1px dashed #3b82f6; display: inline-block;">
                ${otp}
              </span>
            </div>
            <p style="font-size: 14px; color: #64748b;">This OTP is valid for 10 minutes. Please do not share this code with anyone.</p>
          </div>
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
            <p>Prof. Shravan Sir & Prof. Sham Bhole Sir | Smart Step Academy, Latur</p>
          </div>
        </div>
      `,
    };

    let sent = false;
    let mailError = "";
    try {
      const sendPromise = transporter.sendMail(mailOptions);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("SMTP connection timed out on serverless platform")), 4000)
      );
      await Promise.race([sendPromise, timeoutPromise]);
      sent = true;
    } catch (mailErr: any) {
      console.error("Nodemailer send err:", mailErr);
      mailError = mailErr?.message || String(mailErr);
    }

    if (sent) {
      return res.json({
        success: true,
        message: `OTP sent successfully to ${cleanEmail}`,
        otpToken,
      });
    } else {
      console.warn(`SMTP send failed for ${cleanEmail}: ${mailError}. Providing OTP verification fallback.`);
      return res.json({
        success: true,
        message: `OTP generated for ${cleanEmail}. (Code available for verification).`,
        otpToken,
        debugOtp: otp,
      });
    }
  } catch (err: any) {
    console.error("Error sending OTP:", err);
    res.status(500).json({ success: false, message: "Failed to process OTP request" });
  }
});

// 2. Verify OTP & Process Submission
apiRouter.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp, formType, formData, otpToken } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = otp.trim();

    let isVerified = false;

    // 1. Check stateless token
    if (otpToken) {
      const tokenResult = verifyOtpToken(cleanEmail, cleanOtp, otpToken);
      if (tokenResult.valid) {
        isVerified = true;
      }
    }

    // 2. Fallback to in-memory store
    if (!isVerified) {
      const stored = otpStore.get(cleanEmail);
      if (stored && stored.otp === cleanOtp && Date.now() <= stored.expiresAt) {
        isVerified = true;
        otpStore.delete(cleanEmail);
      }
    }

    if (!isVerified) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP code. Please check your email and enter the correct 6-digit code.",
      });
    }

    // Process image uploads if Admission Form
    let photoUrl = formData?.photoUrl || null;
    let aadharUrl = formData?.aadharUrl || null;

    if (formData?.photoBase64) {
      const uploaded = await uploadToImgBB(formData.photoBase64);
      if (uploaded) photoUrl = uploaded;
    }

    if (formData?.aadharBase64) {
      const uploaded = await uploadToImgBB(formData.aadharBase64);
      if (uploaded) aadharUrl = uploaded;
    }

    const submissionRecord = {
      id: "SUB-" + Date.now(),
      formType: formType || "Enquiry",
      submittedAt: new Date().toISOString(),
      email: cleanEmail,
      firstName: formData?.firstName || formData?.name || "",
      lastName: formData?.lastName || "",
      mobileNumber: formData?.mobileNumber || formData?.phone || "",
      address: formData?.address || "",
      question: formData?.question || formData?.query || "",
      selectedClass: formData?.selectedClass || "",
      selectedSubjects: formData?.selectedSubjects || [],
      preferredTime: formData?.preferredTime || "4:00 PM - 7:00 PM",
      photoUrl,
      aadharUrl,
      reportTarget: formData?.reportTarget || "",
      complaintDetails: formData?.complaintDetails || "",
    };

    // 1. Save to JSONBin
    await saveToJSONBin(submissionRecord);

    // 2. Send Telegram Alert
    let telegramText = "";
    if (formType === "Admission") {
      telegramText = `🎓 <b>NEW ADMISSION FORM SUBMITTED</b>\n\n` +
        `<b>Name:</b> ${submissionRecord.firstName} ${submissionRecord.lastName}\n` +
        `<b>Mobile:</b> ${submissionRecord.mobileNumber}\n` +
        `<b>Email:</b> ${submissionRecord.email}\n` +
        `<b>Class:</b> ${submissionRecord.selectedClass}\n` +
        `<b>Subjects:</b> ${Array.isArray(submissionRecord.selectedSubjects) ? submissionRecord.selectedSubjects.join(", ") : submissionRecord.selectedSubjects}\n` +
        `<b>Timing:</b> ${submissionRecord.preferredTime}\n` +
        `<b>Address:</b> ${submissionRecord.address}\n` +
        `<b>Photo Link:</b> ${photoUrl || "N/A"}\n` +
        `<b>Aadhar Link:</b> ${aadharUrl || "N/A"}\n` +
        `<b>Date:</b> ${new Date().toLocaleString()}`;
    } else if (formType === "Support/Complaint") {
      telegramText = `🚨 <b>NEW COMPLAINT / REPORT RECEIVED</b>\n\n` +
        `<b>Report Against:</b> ${submissionRecord.reportTarget}\n` +
        `<b>Submitted By:</b> ${submissionRecord.firstName} ${submissionRecord.lastName}\n` +
        `<b>Mobile:</b> ${submissionRecord.mobileNumber}\n` +
        `<b>Email:</b> ${submissionRecord.email}\n` +
        `<b>Details:</b> ${submissionRecord.complaintDetails}\n` +
        `<b>Date:</b> ${new Date().toLocaleString()}`;
    } else {
      telegramText = `📩 <b>NEW QUICK ENQUIRY RECEIVED</b>\n\n` +
        `<b>Name:</b> ${submissionRecord.firstName} ${submissionRecord.lastName}\n` +
        `<b>Mobile:</b> ${submissionRecord.mobileNumber}\n` +
        `<b>Email:</b> ${submissionRecord.email}\n` +
        `<b>Address:</b> ${submissionRecord.address}\n` +
        `<b>Question / Query:</b> ${submissionRecord.question}\n` +
        `<b>Date:</b> ${new Date().toLocaleString()}`;
    }

    await sendTelegramMessage(telegramText);

    // 3. Send Confirmation Email to User
    const userConfirmationMail = {
      from: `"Smart Step Academy" <${config.smtpUser}>`,
      to: cleanEmail,
      subject: `Form Submission Received - Smart Step Academy Latur`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #2563eb;">
            <h2 style="color: #1e3a8a; margin: 0;">Smart Step Academy</h2>
            <p style="color: #64748b; margin-top: 4px; font-size: 14px;">Latur, Back of Dhanvantari Clinic - 413512</p>
          </div>
          
          <div style="padding: 24px 0; color: #334155; line-height: 1.6;">
            <p>Dear <strong>${submissionRecord.firstName || "Applicant"}</strong>,</p>
            <p>We have received your <strong>${formType || "Enquiry"} Form</strong> submission.</p>
            <p>Our team and professors will review your details and call you on your mobile number <strong>${submissionRecord.mobileNumber}</strong> very soon.</p>
            
            <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; margin: 20px 0;">
              <h4 style="margin-top: 0; color: #1e293b;">Academy Class Timings & Details:</h4>
              <ul style="margin: 0; padding-left: 20px; color: #475569;">
                <li><strong>Class Hours:</strong> Daily 4:00 PM to 7:00 PM</li>
                <li><strong>English Period:</strong> 4:00 PM - 5:00 PM</li>
                <li><strong>Maths Period:</strong> 5:00 PM - 6:00 PM</li>
                <li><strong>Science Period:</strong> 6:00 PM - 7:00 PM</li>
                <li><strong>Faculties:</strong> Prof. Shravan Sir & Prof. Sham Bhole Sir</li>
              </ul>
            </div>
            
            <p style="font-size: 16px; color: #2563eb; font-weight: bold; margin-top: 24px;">
              Thanks for choosing us!
            </p>
            <p style="margin-bottom: 0;">Warm Regards,<br><strong>Smart Step Academy</strong> (Gravity Academy)</p>
          </div>
          
          <div style="text-align: center; padding-top: 16px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8;">
            Smart Step Academy, Back of Dhanvantari Clinic, Latur - 413512
          </div>
        </div>
      `,
    };

    try {
      await transporter.sendMail(userConfirmationMail);
    } catch (mailErr) {
      console.error("Confirmation email error:", mailErr);
    }

    res.json({
      success: true,
      message: "Form verified & submitted successfully!",
      submissionId: submissionRecord.id,
    });
  } catch (err: any) {
    console.error("Error in verify-otp submission:", err);
    res.status(500).json({ success: false, message: "Internal server error during form submission" });
  }
});

// Admin API
apiRouter.get("/admin/data", async (req, res) => {
  try {
    const getRes = await fetch(`https://api.jsonbin.io/v3/b/${config.jsonbinId}`, {
      headers: {
        "X-Master-Key": config.jsonbinKey,
      },
    });

    if (getRes.ok) {
      const getJson = await getRes.json();
      return res.json({ success: true, record: getJson.record || {} });
    }
    res.json({ success: true, record: { submissions: [], gallery: [], offers: [], videos: [] } });
  } catch (err) {
    console.error("Admin data fetch error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch admin data" });
  }
});

apiRouter.post("/admin/update", async (req, res) => {
  try {
    const { record } = req.body;
    if (!record) {
      return res.status(400).json({ success: false, message: "Record is required" });
    }

    const putRes = await fetch(`https://api.jsonbin.io/v3/b/${config.jsonbinId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": config.jsonbinKey,
      },
      body: JSON.stringify(record),
    });

    if (putRes.ok) {
      return res.json({ success: true, message: "Admin database updated successfully" });
    }
    res.status(500).json({ success: false, message: "Failed to update database on JSONBin" });
  } catch (err) {
    console.error("Admin update error:", err);
    res.status(500).json({ success: false, message: "Failed to save admin changes" });
  }
});

apiRouter.post("/upload-image", async (req, res) => {
  try {
    const { base64Data } = req.body;
    if (!base64Data) {
      return res.status(400).json({ success: false, message: "Image base64 is required" });
    }

    const url = await uploadToImgBB(base64Data);
    if (url) {
      return res.json({ success: true, url });
    }
    res.status(500).json({ success: false, message: "ImgBB upload failed" });
  } catch (err) {
    console.error("Upload route error:", err);
    res.status(500).json({ success: false, message: "Image upload failed" });
  }
});

// Mount router on both /api and / to handle all netlify path variations
app.use("/api", apiRouter);
app.use("/", apiRouter);

// HTML redirects
app.get("/support.html", (req, res) => {
  res.redirect("/support");
});

app.get("/admin.html", (req, res) => {
  res.redirect("/admin");
});

// Start express server & Vite middleware when running standalone
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Smart Step Academy server running on http://localhost:${PORT}`);
  });
}

if (!process.env.NETLIFY && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
  start();
}

