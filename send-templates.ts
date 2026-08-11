import nodemailer from "nodemailer";

async function sendTemplates() {
  const smtpUser = "ishowspeed76042@gmail.com";
  const smtpPass = "zxdamwuqqznsuqwl";
  const recipientEmail = "ishowspeed76042@gmail.com";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const emailSubject = "Smart Step Academy - Email Templates Documentation & Copies";

  const emailBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Smart Step Academy Email Templates</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f1f5f9; padding: 20px; color: #1e293b;">
  <div style="max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 24px; border: 1px solid #cbd5e1; shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
    
    <div style="text-align: center; padding-bottom: 16px; border-bottom: 3px solid #2563eb; margin-bottom: 24px;">
      <h1 style="color: #1e3a8a; margin: 0; font-size: 26px;">Smart Step Academy Email Templates</h1>
      <p style="color: #64748b; margin-top: 6px; font-size: 14px;">Official Copies of All System Email Templates Sent to Users</p>
    </div>

    <!-- TEMPLATE 1 -->
    <div style="margin-bottom: 32px; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
      <div style="background-color: #2563eb; color: #ffffff; padding: 12px 16px; font-weight: bold; font-size: 15px;">
        1. Email Verification OTP Template (Sent during Form Submission)
      </div>
      <div style="padding: 20px; background-color: #f8fafc;">
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #3b82f6;">
            <h2 style="color: #1e3a8a; margin: 0; font-size: 22px;">Smart Step Academy</h2>
            <p style="color: #64748b; margin-top: 4px; font-size: 14px;">Latur - Back of Dhanvantari Clinic (413512)</p>
          </div>
          <div style="padding: 24px 0;">
            <p style="font-size: 16px; color: #334155;">Hello [Student / Parent Name],</p>
            <p style="font-size: 15px; color: #475569;">Your Email Verification OTP for form submission is:</p>
            <div style="text-align: center; margin: 24px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #2563eb; background: #dbeafe; padding: 12px 24px; border-radius: 8px; border: 1px dashed #3b82f6; display: inline-block;">
                123456
              </span>
            </div>
            <p style="font-size: 14px; color: #64748b;">This OTP is valid for 10 minutes. Please do not share this code with anyone.</p>
          </div>
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
            <p>Prof. Shravan Sir & Prof. Bhole Sir | Smart Step Academy, Latur</p>
          </div>
        </div>
      </div>
    </div>

    <!-- TEMPLATE 2 -->
    <div style="margin-bottom: 24px; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
      <div style="background-color: #10b981; color: #ffffff; padding: 12px 16px; font-weight: bold; font-size: 15px;">
        2. Form Submission Confirmation Template (Sent after Successful Verification)
      </div>
      <div style="padding: 20px; background-color: #f8fafc;">
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #2563eb;">
            <h2 style="color: #1e3a8a; margin: 0;">Smart Step Academy</h2>
            <p style="color: #64748b; margin-top: 4px; font-size: 14px;">Latur, Back of Dhanvantari Clinic - 413512</p>
          </div>
          
          <div style="padding: 24px 0; color: #334155; line-height: 1.6;">
            <p>Dear <strong>[Applicant Name]</strong>,</p>
            <p>We have received your <strong>[Admission / Enquiry] Form</strong> submission.</p>
            <p>Our team and professors will review your details and call you on your mobile number <strong>[Mobile Number]</strong> very soon.</p>
            
            <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; margin: 20px 0;">
              <h4 style="margin-top: 0; color: #1e293b;">Academy Class Timings & Details:</h4>
              <ul style="margin: 0; padding-left: 20px; color: #475569;">
                <li><strong>Class Hours:</strong> Daily 4:00 PM to 7:00 PM</li>
                <li><strong>English Period:</strong> 4:00 PM - 5:00 PM</li>
                <li><strong>Maths Period:</strong> 5:00 PM - 6:00 PM</li>
                <li><strong>Science Period:</strong> 6:00 PM - 7:00 PM</li>
                <li><strong>Faculties:</strong> Prof. Shravan Sir & Prof. Bhole Sir</li>
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
      </div>
    </div>

    <div style="text-align: center; font-size: 12px; color: #64748b; padding-top: 12px; border-top: 1px solid #e2e8f0;">
      ✔ Sent directly to ${recipientEmail} from Smart Step Academy System.
    </div>

  </div>
</body>
</html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Smart Step Academy" <${smtpUser}>`,
      to: recipientEmail,
      subject: emailSubject,
      html: emailBody,
    });
    console.log("Email sent successfully! Message ID:", info.messageId);
  } catch (err) {
    console.error("Failed to send email:", err);
  }
}

sendTemplates();
