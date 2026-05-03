"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  FiUpload, FiTrash2, FiLogOut, FiImage, FiUsers,
  FiCheckCircle, FiClock, FiX, FiRefreshCw,
} from "react-icons/fi";

type Inquiry = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  serviceType: string;
  message?: string;
  status: "new" | "contacted" | "booked" | "closed";
  createdAt: string;
};

type GalleryImg = {
  _id: string;
  title: string;
  category: string;
  cloudinaryUrl: string;
  createdAt: string;
};

type TabType = "gallery" | "leads";

const STATUS_COLORS = {
  new: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  contacted: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  booked: "bg-green-500/20 text-green-400 border-green-500/30",
  closed: "bg-stone-600/30 text-stone-400 border-stone-600",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<TabType>("leads");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [gallery, setGallery] = useState<GalleryImg[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Upload state
  const [uploadFiles, setUploadFiles] = useState<{ file: File; preview: string; title: string; category: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auth guard
  useEffect(() => {
    const auth = localStorage.getItem("parichay_admin");
    if (!auth) router.replace("/admin");
  }, [router]);

  const fetchData = useCallback(async () => {
    setLoadingData(true);
    try {
      const [inqRes, galRes] = await Promise.all([
        fetch("/api/inquiries"),
        fetch("/api/gallery"),
      ]);
      const inqData = await inqRes.json();
      const galData = await galRes.json();
      setInquiries(inqData.inquiries || []);
      setGallery(galData.images || []);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = () => {
    localStorage.removeItem("parichay_admin");
    router.push("/admin");
  };

  // ─── Gallery Upload ───────────────────────────────────────
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      title: file.name.replace(/\.[^/.]+$/, ""),
      category: "wedding",
    }));
    setUploadFiles((prev) => [...prev, ...newFiles]);
  };

  const removeUploadFile = (idx: number) => {
    setUploadFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateUploadField = (idx: number, field: "title" | "category", value: string) => {
    setUploadFiles((prev) =>
      prev.map((f, i) => (i === idx ? { ...f, [field]: value } : f))
    );
  };

  const toDataUri = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleUpload = async () => {
    if (!uploadFiles.length) return;
    setUploading(true);
    let successCount = 0;

    for (const item of uploadFiles) {
      try {
        const dataUri = await toDataUri(item.file);
        const res = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: item.title, category: item.category, dataUri }),
        });
        if (res.ok) successCount++;
      } catch {
        // continue uploading others
      }
    }

    toast.success(`${successCount}/${uploadFiles.length} images uploaded!`);
    setUploadFiles([]);
    await fetchData();
    setUploading(false);
  };

  // ─── Gallery Delete ───────────────────────────────────────
  const handleDeleteImage = async (id: string) => {
    if (!confirm("Delete this image permanently?")) return;
    try {
      await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      setGallery((prev) => prev.filter((img) => img._id !== id));
      toast.success("Image deleted");
    } catch {
      toast.error("Failed to delete image");
    }
  };

  // ─── Lead Status Update ───────────────────────────────────
  const handleStatusChange = async (id: string, status: string) => {
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setInquiries((prev) =>
        prev.map((inq) => (inq._id === id ? { ...inq, status: status as Inquiry["status"] } : inq))
      );
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    try {
      await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      setInquiries((prev) => prev.filter((inq) => inq._id !== id));
      toast.success("Inquiry deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  // Stats
  const newCount = inquiries.filter((i) => i.status === "new").length;
  const bookedCount = inquiries.filter((i) => i.status === "booked").length;

  return (
    <div className="min-h-screen bg-stone-950 pt-20">
      {/* Top Bar */}
      <div className="bg-stone-900 border-b border-stone-800 px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
            <span className="font-serif font-bold text-stone-950 text-sm">P</span>
          </div>
          <div>
            <span className="text-stone-50 font-semibold text-sm">Admin Dashboard</span>
            <p className="text-stone-500 text-xs">Parichay Photography</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="p-2 text-stone-400 hover:text-amber-400 transition-colors"
            title="Refresh data"
          >
            <FiRefreshCw size={16} className={loadingData ? "animate-spin" : ""} />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-stone-700 text-stone-400 hover:border-red-500/50 hover:text-red-400 text-xs tracking-wider uppercase rounded-sm transition-all"
          >
            <FiLogOut size={14} />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: FiUsers, label: "Total Leads", value: inquiries.length, color: "text-blue-400" },
            { icon: FiClock, label: "New Inquiries", value: newCount, color: "text-amber-400" },
            { icon: FiCheckCircle, label: "Bookings", value: bookedCount, color: "text-green-400" },
            { icon: FiImage, label: "Gallery Images", value: gallery.length, color: "text-purple-400" },
          ].map((stat) => (
            <div key={stat.label} className="bg-stone-900 border border-stone-800 rounded-sm p-5">
              <stat.icon size={20} className={`${stat.color} mb-3`} />
              <div className={`font-serif text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <p className="text-stone-500 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-stone-800">
          {(["leads", "gallery"] as TabType[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-3 text-xs tracking-[0.15em] uppercase font-medium border-b-2 transition-all duration-300 -mb-px ${
                tab === t
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-stone-500 hover:text-stone-300"
              }`}
            >
              {t === "leads" ? "Client Leads" : "Gallery Manager"}
            </button>
          ))}
        </div>

        {/* ─── LEADS TAB ─────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {tab === "leads" && (
            <motion.div
              key="leads"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {inquiries.length === 0 ? (
                <div className="text-center py-20 text-stone-600">
                  <FiUsers size={40} className="mx-auto mb-4 opacity-30" />
                  <p>No inquiries yet. They'll appear here once clients submit the contact form.</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-sm border border-stone-800">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-stone-900 border-b border-stone-800">
                        {["Client", "Contact", "Service", "Event Date", "Status", "Actions"].map((h) => (
                          <th key={h} className="px-5 py-4 text-left text-xs text-stone-400 tracking-[0.15em] uppercase font-medium">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800/50">
                      {inquiries.map((inq) => (
                        <tr key={inq._id} className="hover:bg-stone-900/50 transition-colors">
                          <td className="px-5 py-4">
                            <p className="text-stone-50 font-medium">{inq.name}</p>
                            <p className="text-stone-500 text-xs mt-0.5">
                              {new Date(inq.createdAt).toLocaleDateString("en-IN")}
                            </p>
                          </td>
                          <td className="px-5 py-4">
                            <p className="text-stone-300 text-xs">{inq.email}</p>
                            <p className="text-stone-400 text-xs mt-0.5">{inq.phone}</p>
                          </td>
                          <td className="px-5 py-4 text-stone-300 text-xs">{inq.serviceType}</td>
                          <td className="px-5 py-4 text-stone-300 text-xs">{inq.eventDate}</td>
                          <td className="px-5 py-4">
                            <select
                              value={inq.status}
                              onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                              className={`text-xs px-2 py-1 rounded-sm border bg-transparent cursor-pointer outline-none ${STATUS_COLORS[inq.status]}`}
                            >
                              <option value="new" className="bg-stone-900 text-stone-50">New</option>
                              <option value="contacted" className="bg-stone-900 text-stone-50">Contacted</option>
                              <option value="booked" className="bg-stone-900 text-stone-50">Booked</option>
                              <option value="closed" className="bg-stone-900 text-stone-50">Closed</option>
                            </select>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <a
                                href={`https://wa.me/${inq.phone.replace(/\D/g, "")}?text=Hi ${inq.name}, this is Parichay Photography! We received your inquiry for ${inq.serviceType}.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 text-green-500 hover:text-green-400 transition-colors"
                                title="WhatsApp"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                              </a>
                              <button
                                onClick={() => handleDeleteInquiry(inq._id)}
                                className="p-1.5 text-stone-600 hover:text-red-400 transition-colors"
                                title="Delete"
                              >
                                <FiTrash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {/* ─── GALLERY TAB ────────────────────────────────── */}
          {tab === "gallery" && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Upload Zone */}
              <div className="border-2 border-dashed border-stone-700 hover:border-amber-500/50 rounded-sm p-10 text-center mb-6 transition-colors cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}>
                <FiUpload size={32} className="mx-auto mb-3 text-stone-600 group-hover:text-amber-500 transition-colors" />
                <p className="text-stone-400 text-sm mb-1">Click or drag images here to upload</p>
                <p className="text-stone-600 text-xs">Supports JPG, PNG, WEBP — auto-optimized via Cloudinary</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Pending Uploads */}
              {uploadFiles.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-stone-300 text-xs tracking-widest uppercase mb-4">
                    Pending Upload ({uploadFiles.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    {uploadFiles.map((item, idx) => (
                      <div key={idx} className="bg-stone-900 border border-stone-800 rounded-sm overflow-hidden">
                        <div className="relative h-40">
                          <Image src={item.preview} alt={item.title} fill className="object-cover" sizes="300px" />
                          <button
                            onClick={() => removeUploadFile(idx)}
                            className="absolute top-2 right-2 w-6 h-6 bg-stone-950/80 rounded-full flex items-center justify-center text-stone-300 hover:text-red-400"
                          >
                            <FiX size={12} />
                          </button>
                        </div>
                        <div className="p-3 space-y-2">
                          <input
                            value={item.title}
                            onChange={(e) => updateUploadField(idx, "title", e.target.value)}
                            className="w-full bg-stone-800 border border-stone-700 text-stone-50 text-xs rounded-sm px-3 py-2 outline-none focus:border-amber-500"
                            placeholder="Image title"
                          />
                          <select
                            value={item.category}
                            onChange={(e) => updateUploadField(idx, "category", e.target.value)}
                            className="w-full bg-stone-800 border border-stone-700 text-stone-300 text-xs rounded-sm px-3 py-2 outline-none focus:border-amber-500"
                          >
                            {["wedding", "portrait", "fashion", "product", "baby", "candid"].map((c) => (
                              <option key={c} value={c} className="bg-stone-900 capitalize">{c}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-stone-950 font-semibold text-sm uppercase tracking-wider rounded-sm transition-all"
                  >
                    {uploading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Uploading to Cloudinary...
                      </>
                    ) : (
                      <>
                        <FiUpload size={16} />
                        Upload {uploadFiles.length} Image{uploadFiles.length > 1 ? "s" : ""}
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Existing Gallery */}
              <h3 className="text-stone-300 text-xs tracking-widest uppercase mb-4">
                Published Gallery ({gallery.length})
              </h3>
              {gallery.length === 0 ? (
                <div className="text-center py-16 text-stone-600">
                  <FiImage size={40} className="mx-auto mb-4 opacity-30" />
                  <p>No images yet. Upload some above!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {gallery.map((img) => (
                    <div key={img._id} className="group relative rounded-sm overflow-hidden bg-stone-900">
                      <div className="relative h-36">
                        <Image
                          src={img.cloudinaryUrl}
                          alt={img.title}
                          fill
                          className="object-cover"
                          sizes="200px"
                        />
                        <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/60 transition-all flex items-center justify-center">
                          <button
                            onClick={() => handleDeleteImage(img._id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-red-500/20 border border-red-500/50 rounded-sm text-red-400 hover:bg-red-500/30"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="p-2">
                        <p className="text-stone-300 text-xs truncate">{img.title}</p>
                        <span className="text-amber-400 text-[10px] capitalize">{img.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
