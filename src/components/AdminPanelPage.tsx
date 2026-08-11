import React, { useState, useEffect } from "react";
import { AdminDatabaseState, GalleryItem, OfferNotification, VideoLicense, SubmissionRecord } from "../types";
import {
  Lock,
  Unlock,
  Upload,
  Trash2,
  Plus,
  Image,
  Bell,
  Video,
  Users,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Eye,
} from "lucide-react";

export const AdminPanelPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  const [dbState, setDbState] = useState<AdminDatabaseState>({
    submissions: [],
    gallery: [],
    offers: [],
    videos: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // New item form states
  const [newImageTitle, setNewImageTitle] = useState("");
  const [newImageCategory, setNewImageCategory] = useState<"Gallery" | "Success Story" | "Classroom">("Gallery");
  const [newImageFile, setNewImageFile] = useState<string | null>(null);

  const [newOfferTitle, setNewOfferTitle] = useState("");
  const [newOfferDescription, setNewOfferDescription] = useState("");
  const [newOfferBadge, setNewOfferBadge] = useState("NEW BATCH");

  const [newVidTitle, setNewVidTitle] = useState("");
  const [newVidSubject, setNewVidSubject] = useState("Mathematics");
  const [newVidUrl, setNewVidUrl] = useState("");
  const [newVidDesc, setNewVidDesc] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminData();
    }
  }, [isAuthenticated]);

  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/data");
      const data = await res.json();
      if (data.success && data.record) {
        setDbState({
          submissions: Array.isArray(data.record.submissions) ? data.record.submissions : [],
          gallery: Array.isArray(data.record.gallery) ? data.record.gallery : [],
          offers: Array.isArray(data.record.offers) ? data.record.offers : [],
          videos: Array.isArray(data.record.videos) ? data.record.videos : [],
        });
      }
    } catch (err) {
      console.error("Fetch admin error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "admin123" || passcode.trim() === "smartstep") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid Passcode. Default passcode is: admin123");
    }
  };

  const saveAdminChanges = async (newState: AdminDatabaseState) => {
    setIsLoading(true);
    setStatusMessage("Saving changes to JSONBin database...");
    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ record: newState }),
      });
      const data = await res.json();
      if (data.success) {
        setDbState(newState);
        setStatusMessage("Database updated successfully!");
        setTimeout(() => setStatusMessage(""), 3000);
      } else {
        setStatusMessage("Failed to update database.");
      }
    } catch (err) {
      setStatusMessage("Error saving changes.");
    } finally {
      setIsLoading(false);
    }
  };

  // 1. Upload Gallery Image
  const handleUploadImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageFile || !newImageTitle) {
      alert("Please select an image file and enter a title.");
      return;
    }

    setIsLoading(true);
    setStatusMessage("Uploading image to ImgBB...");

    try {
      const res = await fetch("/api/upload-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64Data: newImageFile }),
      });

      const data = await res.json();
      if (data.success && data.url) {
        const newItem: GalleryItem = {
          id: "GAL-" + Date.now(),
          title: newImageTitle,
          category: newImageCategory,
          imageUrl: data.url,
          uploadedAt: new Date().toISOString(),
        };

        const updated = {
          ...dbState,
          gallery: [newItem, ...dbState.gallery],
        };

        await saveAdminChanges(updated);
        setNewImageTitle("");
        setNewImageFile(null);
      } else {
        setStatusMessage("Image upload to ImgBB failed.");
      }
    } catch (err) {
      setStatusMessage("Failed to upload image.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    const updated = {
      ...dbState,
      gallery: dbState.gallery.filter((g) => g.id !== id),
    };
    saveAdminChanges(updated);
  };

  // 2. Manage Offers
  const handleAddOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOfferTitle) return;

    const newOffer: OfferNotification = {
      id: "OFF-" + Date.now(),
      title: newOfferTitle,
      description: newOfferDescription,
      badge: newOfferBadge,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    const updated = {
      ...dbState,
      offers: [newOffer, ...dbState.offers],
    };

    saveAdminChanges(updated);
    setNewOfferTitle("");
    setNewOfferDescription("");
  };

  const handleDeleteOffer = (id: string) => {
    const updated = {
      ...dbState,
      offers: dbState.offers.filter((o) => o.id !== id),
    };
    saveAdminChanges(updated);
  };

  const handleToggleOffer = (id: string) => {
    const updated = {
      ...dbState,
      offers: dbState.offers.map((o) => (o.id === id ? { ...o, isActive: !o.isActive } : o)),
    };
    saveAdminChanges(updated);
  };

  // 3. Manage Videos / License
  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVidTitle || !newVidUrl) return;

    // Convert standard youtube link to embed link if needed
    let embedUrl = newVidUrl;
    if (newVidUrl.includes("youtube.com/watch?v=")) {
      embedUrl = newVidUrl.replace("watch?v=", "embed/");
    } else if (newVidUrl.includes("youtu.be/")) {
      embedUrl = newVidUrl.replace("youtu.be/", "youtube.com/embed/");
    }

    const newVid: VideoLicense = {
      id: "VID-" + Date.now(),
      title: newVidTitle,
      subject: newVidSubject,
      videoUrl: embedUrl,
      description: newVidDesc,
      addedAt: new Date().toISOString(),
    };

    const updated = {
      ...dbState,
      videos: [newVid, ...dbState.videos],
    };

    saveAdminChanges(updated);
    setNewVidTitle("");
    setNewVidUrl("");
    setNewVidDesc("");
  };

  const handleDeleteVideo = (id: string) => {
    const updated = {
      ...dbState,
      videos: dbState.videos.filter((v) => v.id !== id),
    };
    saveAdminChanges(updated);
  };

  if (!isAuthenticated) {
    return (
      <div className="py-20 px-4 flex items-center justify-center">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full text-white shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-white">Smart Step Academy Admin Portal</h2>
            <p className="text-xs text-slate-400">
              Enter director passcode to access database, gallery uploads, active offers & submissions.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-rose-950/80 border border-rose-800 rounded-xl text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Admin Security Passcode
              </label>
              <input
                type="password"
                placeholder="Enter passcode (default: admin123)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-3 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm focus:border-amber-500 focus:outline-none text-white font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/20 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Dashboard</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto text-white space-y-10">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Unlock className="w-3.5 h-3.5 text-amber-400" />
            <span>Authenticated Director Portal</span>
          </div>
          <h1 className="text-3xl font-black text-white">Smart Step Academy Admin Control</h1>
          <p className="text-xs text-slate-400 mt-1">
            Connected to JSONBin Database ID: 6a7b2227f5f4af5e29073d4e
          </p>
        </div>

        <button
          onClick={() => setIsAuthenticated(false)}
          className="px-4 py-2 bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 border border-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
        >
          Logout Admin
        </button>
      </div>

      {statusMessage && (
        <div className="p-4 bg-blue-950/80 border border-blue-800 rounded-2xl text-blue-200 text-xs flex items-center justify-between">
          <span className="font-semibold">{statusMessage}</span>
          {isLoading && <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />}
        </div>
      )}

      {/* 1. Upload Gallery & Success Story Images */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
            <Image className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Upload Gallery & Success Folder Images</h2>
            <p className="text-xs text-slate-400">
              Upload classroom photos and topper achievement banners (ImgBB integration).
            </p>
          </div>
        </div>

        <form onSubmit={handleUploadImage} className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Image Title</label>
            <input
              type="text"
              required
              placeholder="e.g. 10th Board Toppers 2026"
              value={newImageTitle}
              onChange={(e) => setNewImageTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
            <select
              value={newImageCategory}
              onChange={(e) => setNewImageCategory(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
            >
              <option value="Gallery">Gallery</option>
              <option value="Success Story">Success Story / Topper</option>
              <option value="Classroom">Classroom Activity</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Select File</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const r = new FileReader();
                  r.onloadend = () => setNewImageFile(r.result as string);
                  r.readAsDataURL(file);
                }
              }}
              className="w-full text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:bg-blue-600 file:text-white file:font-bold cursor-pointer"
            />
          </div>

          <div className="sm:col-span-3 pt-2">
            <button
              type="submit"
              disabled={isLoading || !newImageFile}
              className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Upload to Gallery & Save Database</span>
            </button>
          </div>
        </form>

        {/* Existing Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {dbState.gallery.map((g) => (
            <div key={g.id} className="relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800 p-2 text-xs group">
              <img src={g.imageUrl} alt={g.title} className="w-full h-28 object-cover rounded-lg mb-2" />
              <div className="font-semibold text-white line-clamp-1">{g.title}</div>
              <div className="text-[10px] text-amber-400">{g.category}</div>
              <button
                onClick={() => handleDeleteImage(g.id)}
                className="absolute top-3 right-3 bg-rose-600/90 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Post New Offer Notifications & Announcements */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Live Offer Banners & Notifications</h2>
            <p className="text-xs text-slate-400">
              Post discount offers or batch launch announcements displayed on top marquee.
            </p>
          </div>
        </div>

        <form onSubmit={handleAddOffer} className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Offer Title</label>
            <input
              type="text"
              required
              placeholder="e.g. 20% Off for 10th Maths Batch"
              value={newOfferTitle}
              onChange={(e) => setNewOfferTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
            <input
              type="text"
              placeholder="e.g. Valid till end of month for new students"
              value={newOfferDescription}
              onChange={(e) => setNewOfferDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Tag</label>
            <input
              type="text"
              placeholder="e.g. NEW BATCH or DISCOUNT"
              value={newOfferBadge}
              onChange={(e) => setNewOfferBadge(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs"
            />
          </div>

          <div className="sm:col-span-3">
            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Live Offer Announcement</span>
            </button>
          </div>
        </form>

        <div className="space-y-2">
          {dbState.offers.map((o) => (
            <div key={o.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-bold text-white">{o.title}</span>
                <span className="text-slate-400 ml-2">— {o.description}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleOffer(o.id)}
                  className={`px-2.5 py-1 rounded font-bold ${o.isActive ? "bg-emerald-950 text-emerald-300" : "bg-slate-800 text-slate-500"}`}
                >
                  {o.isActive ? "ACTIVE" : "PAUSED"}
                </button>
                <button onClick={() => handleDeleteOffer(o.id)} className="text-rose-400 hover:text-rose-300 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. License & Video Lecture Links Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">License & Video Lectures Section</h2>
            <p className="text-xs text-slate-400">
              Add YouTube embed links or online lecture licenses for students.
            </p>
          </div>
        </div>

        <form onSubmit={handleAddVideo} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Lecture Title</label>
            <input
              type="text"
              required
              placeholder="e.g. 10th Maths Board Formula Derivation"
              value={newVidTitle}
              onChange={(e) => setNewVidTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
            <select
              value={newVidSubject}
              onChange={(e) => setNewVidSubject(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">Video URL (YouTube or Direct)</label>
            <input
              type="url"
              required
              placeholder="https://www.youtube.com/watch?v=..."
              value={newVidUrl}
              onChange={(e) => setNewVidUrl(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Video License Link</span>
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dbState.videos.map((v) => (
            <div key={v.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white">{v.title}</span>
                <div className="text-[10px] text-blue-400">{v.subject}</div>
              </div>
              <button onClick={() => handleDeleteVideo(v.id)} className="text-rose-400 hover:text-rose-300 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Student Submissions & Complaint Logs */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-600/20 text-emerald-400 rounded-xl border border-emerald-500/30">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Student Submissions & Complaint Records</h2>
            <p className="text-xs text-slate-400">
              Database logs of Enquiries, Admissions (with photo links), and Complaints.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {dbState.submissions.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs bg-slate-950 rounded-2xl border border-slate-800">
              No form submissions recorded yet. Submitted forms will automatically appear here.
            </div>
          ) : (
            dbState.submissions.map((sub) => (
              <div key={sub.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded font-extrabold uppercase ${
                    sub.formType === "Admission" ? "bg-blue-900 text-blue-200" :
                    sub.formType === "Support/Complaint" ? "bg-rose-950 text-rose-300" : "bg-amber-950 text-amber-300"
                  }`}>
                    {sub.formType}
                  </span>
                  <span className="text-slate-500">{new Date(sub.submittedAt).toLocaleString()}</span>
                </div>

                <div className="font-bold text-white text-sm">
                  {sub.firstName} {sub.lastName} • Phone: {sub.mobileNumber} • Email: {sub.email}
                </div>

                {sub.selectedClass && <div><strong>Class:</strong> {sub.selectedClass}</div>}
                {sub.question && <div><strong>Question:</strong> {sub.question}</div>}
                {sub.complaintDetails && (
                  <div className="p-2 bg-rose-950/40 border border-rose-900 rounded text-rose-200">
                    <strong>Target:</strong> {sub.reportTarget} | <strong>Details:</strong> {sub.complaintDetails}
                  </div>
                )}

                <div className="flex gap-4 pt-1 text-[11px]">
                  {sub.photoUrl && (
                    <a href={sub.photoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> View Photo
                    </a>
                  )}
                  {sub.aadharUrl && (
                    <a href={sub.aadharUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> View Aadhar Card
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
