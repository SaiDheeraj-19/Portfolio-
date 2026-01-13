"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Save, Plus, Trash2, Lock, LayoutDashboard, FileText, ArrowLeft, Upload, Loader2, Folder, Eye, EyeOff, Settings, Minimize, Maximize, Move, ScanFace } from "lucide-react"
import { useUploadThing } from "@/lib/uploadthing"

export default function AdminPage() {
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [data, setData] = useState<any>(null)
    const [activeTab, setActiveTab] = useState("projects")
    const [isLoading, setIsLoading] = useState(false)
    const [statusMsg, setStatusMsg] = useState("")
    const [uploadingId, setUploadingId] = useState<string | null>(null) // Track which item is uploading "p-0", "c-Global-1"

    const { startUpload: uploadImage } = useUploadThing("imageUploader")
    const { startUpload: uploadResume } = useUploadThing("resumeUploader")

    // Fetch data on load
    useEffect(() => {
        fetch('/api/portfolio')
            .then(res => res.json())
            .then(setData)
            .catch(err => console.error(err))
    }, [])

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === "Saidheeraj@website") {
            setIsAuthenticated(true)
        } else {
            alert("Invalid Password")
        }
    }

    const handleSave = async () => {
        setIsLoading(true)
        setStatusMsg("")
        try {
            const res = await fetch('/api/portfolio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, data })
            })
            if (res.ok) {
                setStatusMsg("Saved successfully!")
                setTimeout(() => setStatusMsg(""), 3000)
            } else {
                setStatusMsg("Failed to save.")
            }
        } catch (err) {
            console.error(err)
            setStatusMsg("Error saving data.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, context: { type: 'project' | 'gallery' | 'cert' | 'profile', pIdx?: number, cat?: string, cIdx?: number, profileField?: 'idCardPhoto' | 'aboutMePhoto' | 'resumeUrl' }) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const uploadKey = context.type === 'cert' ? `c-${context.cat}-${context.cIdx}`
            : context.type === 'profile' ? `prof-${context.profileField}`
                : `p-${context.pIdx}`;
        setUploadingId(uploadKey);

        try {
            let uploadedFiles;
            if (context.profileField === 'resumeUrl') {
                uploadedFiles = await uploadResume([file]);
            } else {
                uploadedFiles = await uploadImage([file]);
            }

            const url = uploadedFiles?.[0]?.url;

            if (url) {
                if (context.type === 'cert' && context.cat && context.cIdx !== undefined) {
                    updateCert(context.cat, context.cIdx, "img", url)
                }
                else if (context.type === 'profile' && context.profileField) {
                    updateProfile(context.profileField, url)
                }
                else if (context.pIdx !== undefined) {
                    if (context.type === 'gallery') {
                        const newProjects = [...data.projects];
                        const gallery = newProjects[context.pIdx].gallery || [];
                        newProjects[context.pIdx] = { ...newProjects[context.pIdx], gallery: [...gallery, url] };
                        setData({ ...data, projects: newProjects });
                    } else {
                        updateProject(context.pIdx, "image", url);
                    }
                }
            }
        } catch (err) {
            console.error(err)
            alert("Upload failed")
        } finally {
            setUploadingId(null);
        }
    };

    // --- Profile Helpers ---
    const updateProfile = (field: string, value: any) => {
        const profile = data.profile || { idCardConfig: { scale: 1, x: 0, y: 0 } };
        // If updating config (nested)
        if (field.startsWith('config.')) {
            const configKey = field.split('.')[1];
            setData({
                ...data,
                profile: {
                    ...profile,
                    idCardConfig: {
                        ...profile.idCardConfig,
                        [configKey]: value
                    }
                }
            });
        } else {
            setData({ ...data, profile: { ...profile, [field]: value } });
        }
    }

    // --- Project Helpers ---
    const updateProject = (idx: number, field: string, value: any) => {
        const newProjects = [...data.projects]
        newProjects[idx] = { ...newProjects[idx], [field]: value }
        setData({ ...data, projects: newProjects })
    }

    const addProject = () => {
        const newProject = {
            title: "New Project",
            category: "Full Stack",
            description: "Description...",
            details: "Full details...",
            image: "",
            gallery: [],
            tags: [],
            links: { demo: "#", github: "#" }
        }
        setData({ ...data, projects: [...data.projects, newProject] })
    }

    const removeProject = (idx: number) => {
        if (!confirm("Delete this project?")) return;
        const newProjects = data.projects.filter((_: any, i: number) => i !== idx)
        setData({ ...data, projects: newProjects })
    }

    // --- Cert Helpers ---
    const updateCert = (category: string, idx: number, field: string, value: any) => {
        const newCerts = { ...data.certificationsData }
        newCerts[category] = [...newCerts[category]]
        newCerts[category][idx] = { ...newCerts[category][idx], [field]: value }
        setData({ ...data, certificationsData: newCerts })
    }

    const addCert = (category: string) => {
        const newCerts = { ...data.certificationsData }
        newCerts[category] = [...newCerts[category], { title: "New Cert", issuer: "Issuer", img: "" }]
        setData({ ...data, certificationsData: newCerts })
    }

    const removeCert = (category: string, idx: number) => {
        if (!confirm("Delete this certificate?")) return;
        const newCerts = { ...data.certificationsData }
        newCerts[category] = newCerts[category].filter((_: any, i: number) => i !== idx)
        setData({ ...data, certificationsData: newCerts })
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
                <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" /> Back to Home
                </Link>
                <form onSubmit={handleLogin} className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 w-full max-w-md flex flex-col gap-6 shadow-2xl">
                    <div className="flex flex-col items-center gap-2 mb-4">
                        <Lock className="w-12 h-12 text-white" />
                        <h1 className="text-2xl font-bold">Admin Portal</h1>
                    </div>
                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Admin Password"
                            className="w-full bg-black border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-white transition-colors pr-12"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    <button type="submit" className="w-full bg-white hover:bg-neutral-200 text-black font-bold py-4 rounded-xl transition-all">
                        Unlock Dashboard
                    </button>
                </form>
            </div>
        )
    }

    if (!data) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading Data...</div>

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div className="flex items-center gap-6 w-full md:w-auto">
                        <Link href="/" className="bg-neutral-900 hover:bg-neutral-800 p-3 rounded-full transition-colors border border-neutral-800">
                            <ArrowLeft className="w-6 h-6 text-neutral-400" />
                        </Link>
                        <h1 className="text-3xl font-black tracking-tighter uppercase flex items-center gap-3">
                            <LayoutDashboard className="text-white" /> Portfolio CMS
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {statusMsg && <span className="text-green-500 font-mono text-sm">{statusMsg}</span>}
                        <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="bg-white hover:bg-neutral-200 text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-50 shadow-lg shadow-white/10"
                        >
                            <Save className="w-5 h-5" /> {isLoading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </header>

                <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                    <button
                        onClick={() => setActiveTab("projects")}
                        className={`px-6 py-3 rounded-full font-bold border transitions-colors whitespace-nowrap ${activeTab === "projects" ? "bg-white text-black border-white" : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white"}`}
                    >
                        Projects ({data.projects.length})
                    </button>
                    <button
                        onClick={() => setActiveTab("certs")}
                        className={`px-6 py-3 rounded-full font-bold border transitions-colors whitespace-nowrap ${activeTab === "certs" ? "bg-white text-black border-white" : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white"}`}
                    >
                        Certifications
                    </button>
                    <button
                        onClick={() => setActiveTab("settings")}
                        className={`px-6 py-3 rounded-full font-bold border transitions-colors whitespace-nowrap flex items-center gap-2 ${activeTab === "settings" ? "bg-white text-black border-white" : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white"}`}
                    >
                        <Settings className="w-4 h-4" /> Settings
                    </button>
                </div>

                {activeTab === "projects" && (
                    <div className="grid grid-cols-1 gap-8">
                        {data.projects.map((project: any, idx: number) => (
                            <div key={idx} className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl flex flex-col md:flex-row gap-8 relative overflow-hidden group">
                                <div className="flex-1 space-y-4">

                                    {/* --- Image Upload Section --- */}
                                    <div className="flex flex-col gap-4 mb-6 bg-black border border-neutral-800 p-4 rounded-xl">
                                        <h3 className="text-xs font-bold text-neutral-500 uppercase flex items-center gap-2">
                                            <Upload className="w-4 h-4" /> Project Media
                                        </h3>
                                        <div className="flex gap-4 items-start">
                                            {/* Main Image */}
                                            <div className="w-32 aspect-video bg-neutral-900 rounded-lg overflow-hidden relative border border-neutral-800 shrink-0 group/img">
                                                {project.image ? (
                                                    <img src={project.image} className="w-full h-full object-cover" alt="Main" />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center text-xs text-neutral-600">No Image</div>
                                                )}
                                                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                                                    {uploadingId === `p-${idx}` ? <Loader2 className="animate-spin w-4 h-4 text-white" /> : <span className="text-[10px] uppercase font-bold text-white">Change Main</span>}
                                                    <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, { type: 'project', pIdx: idx })} accept="image/*" />
                                                </label>
                                            </div>

                                            {/* Gallery Preview/Add */}
                                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                                {project.gallery?.map((g: string, i: number) => (
                                                    <div key={i} className="w-20 aspect-square bg-neutral-900 rounded-lg overflow-hidden shrink-0 border border-neutral-800 relative group/gItem">
                                                        <img src={g} className="w-full h-full object-cover" alt="Gallery" />
                                                        <button
                                                            onClick={() => {
                                                                const newGallery = project.gallery.filter((_: any, x: number) => x !== i);
                                                                updateProject(idx, "gallery", newGallery);
                                                            }}
                                                            className="absolute inset-0 bg-red-500/80 opacity-0 group-hover/gItem:opacity-100 flex items-center justify-center text-white font-bold text-xs"
                                                        >X</button>
                                                    </div>
                                                ))}
                                                <label className="w-20 aspect-square bg-neutral-900 rounded-lg border border-dashed border-neutral-700 hover:border-[#ff4d29] flex items-center justify-center cursor-pointer shrink-0 transition-colors">
                                                    <Plus className="w-5 h-5 text-neutral-500" />
                                                    <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, { type: 'gallery', pIdx: idx })} accept="image/*" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="text-xs text-neutral-500 uppercase font-bold mb-1 block">Title</label>
                                            <input
                                                value={project.title}
                                                onChange={(e) => updateProject(idx, "title", e.target.value)}
                                                className="w-full bg-black border border-neutral-800 rounded-lg p-3 text-white focus:border-white outline-none"
                                            />
                                        </div>
                                        <div className="w-1/3">
                                            <label className="text-xs text-neutral-500 uppercase font-bold mb-1 block">Category</label>
                                            <input
                                                value={project.category}
                                                onChange={(e) => updateProject(idx, "category", e.target.value)}
                                                className="w-full bg-black border border-neutral-800 rounded-lg p-3 text-white focus:border-white outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs text-neutral-500 uppercase font-bold mb-1 block">Description</label>
                                        <textarea
                                            value={project.description}
                                            onChange={(e) => updateProject(idx, "description", e.target.value)}
                                            className="w-full bg-black border border-neutral-800 rounded-lg p-3 text-neutral-300 focus:border-white outline-none h-20"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs text-neutral-500 uppercase font-bold mb-1 block">Details</label>
                                        <textarea
                                            value={project.details}
                                            onChange={(e) => updateProject(idx, "details", e.target.value)}
                                            className="w-full bg-black border border-neutral-800 rounded-lg p-3 text-neutral-300 focus:border-white outline-none h-32"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs text-neutral-500 uppercase font-bold mb-1 block">Tags (Press Enter to add)</label>
                                        <div className="flex flex-wrap gap-2 mb-2 p-2 bg-black border border-neutral-900 rounded-lg min-h-[40px]">
                                            {project.tags?.map((tag: string, tIdx: number) => (
                                                <span key={tIdx} className="bg-neutral-800 text-neutral-300 px-3 py-1 rounded-full text-xs font-mono border border-neutral-700 flex items-center gap-2 group/tag">
                                                    {tag}
                                                    <button
                                                        onClick={() => {
                                                            const newTags = project.tags.filter((_: any, i: number) => i !== tIdx)
                                                            updateProject(idx, "tags", newTags)
                                                        }}
                                                        className="hover:text-red-500 font-bold ml-1 opacity-0 group-hover/tag:opacity-100 transition-opacity"
                                                    >×</button>
                                                </span>
                                            ))}
                                        </div>
                                        <input
                                            placeholder="Type tag & press Enter..."
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    const val = e.currentTarget.value.trim();
                                                    if (val) {
                                                        const currentTags = project.tags || [];
                                                        if (!currentTags.includes(val)) {
                                                            updateProject(idx, "tags", [...currentTags, val]);
                                                        }
                                                        e.currentTarget.value = "";
                                                    }
                                                }
                                            }}
                                            className="w-full bg-black border border-neutral-800 rounded-lg p-3 text-white focus:border-white outline-none text-sm font-mono"
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="text-xs text-neutral-500 uppercase font-bold mb-1 block">Github</label>
                                            <input
                                                value={project.links?.github || ""}
                                                onChange={(e) => updateProject(idx, "links", { ...project.links, github: e.target.value })}
                                                className="w-full bg-black border border-neutral-800 rounded-lg p-3 text-blue-400 font-mono text-sm focus:border-white outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-12 flex flex-col items-center justify-start pt-2">
                                    <button
                                        onClick={() => removeProject(idx)}
                                        className="p-3 text-neutral-600 hover:text-red-500 bg-black hover:bg-red-950/30 rounded-full transition-all border border-neutral-800"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={addProject}
                            className="w-full py-8 text-neutral-500 border-2 border-dashed border-neutral-800 rounded-2xl hover:border-neutral-600 hover:text-white transition-all flex flex-col items-center gap-2"
                        >
                            <Plus className="w-8 h-8" />
                            <span className="font-bold">Add New Project</span>
                        </button>
                    </div>
                )}

                {activeTab === "certs" && (
                    <div className="space-y-12">
                        {Object.keys(data.certificationsData).map((category) => (
                            <div key={category} className="bg-neutral-900/30 p-6 rounded-3xl border border-neutral-800">
                                <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-white">
                                    <Folder className="w-5 h-5" /> {category}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {data.certificationsData[category].map((cert: any, cIdx: number) => (
                                        <div key={cIdx} className="bg-black border border-neutral-800 rounded-xl overflow-hidden group">
                                            <div className="aspect-[4/3] bg-neutral-900 relative">
                                                {cert.img ? (
                                                    <img src={cert.img} className="w-full h-full object-contain p-4" alt={cert.title} />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center text-xs text-neutral-600">No Image</div>
                                                )}

                                                <label className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity z-10">
                                                    {uploadingId === `c-${category}-${cIdx}` ? <Loader2 className="animate-spin w-6 h-6 text-white" /> : <Upload className="w-6 h-6 text-white" />}
                                                    <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, { type: 'cert', cat: category, cIdx })} accept="image/*" />
                                                </label>

                                                <button
                                                    onClick={() => removeCert(category, cIdx)}
                                                    className="absolute top-2 right-2 p-2 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all z-20"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="p-4 space-y-3">
                                                <div>
                                                    <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Title</label>
                                                    <input
                                                        value={cert.title}
                                                        onChange={(e) => updateCert(category, cIdx, "title", e.target.value)}
                                                        className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-sm text-white focus:border-white outline-none"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">Issuer</label>
                                                    <input
                                                        value={cert.issuer}
                                                        onChange={(e) => updateCert(category, cIdx, "issuer", e.target.value)}
                                                        className="w-full bg-neutral-900 border border-neutral-800 rounded p-2 text-sm text-neutral-400 focus:border-[#ff4d29] outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        onClick={() => addCert(category)}
                                        className="aspect-[4/3] border-2 border-dashed border-neutral-800 rounded-xl flex flex-col items-center justify-center text-neutral-500 hover:border-white hover:text-white transition-all"
                                    >
                                        <Plus className="w-8 h-8 mb-2" />
                                        <span className="text-xs font-bold uppercase">Add Cert</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}


                {activeTab === "settings" && (
                    <div className="max-w-4xl mx-auto space-y-12">
                        {/* ID Card Settings */}
                        <div className="bg-neutral-900/50 p-8 rounded-3xl border border-neutral-800">
                            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <ScanFace className="w-6 h-6" /> ID Card Photo
                            </h2>

                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Preview Area */}
                                <div className="flex-1 flex flex-col items-center gap-4">
                                    <div className="w-[300px] h-[400px] rounded-[20px] overflow-hidden relative shadow-2xl border border-neutral-800 bg-black">
                                        {/* Mock ID Card Content */}
                                        <div className="absolute inset-0 z-10 pointer-events-none border-[6px] border-neutral-900/50 rounded-[20px]"></div>

                                        {/* Image Container with Transforms */}
                                        <div className="w-full h-full relative overflow-hidden bg-neutral-800">
                                            {data.profile?.idCardPhoto ? (
                                                <img
                                                    src={data.profile.idCardPhoto}
                                                    className="w-full h-full object-cover transition-transform origin-center"
                                                    style={{
                                                        transform: `scale(${data.profile?.idCardConfig?.scale || 1.1}) translate(${data.profile?.idCardConfig?.x || 0}px, ${data.profile?.idCardConfig?.y || 0}px)`
                                                    }}
                                                    alt="ID Preview"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-neutral-500 text-sm">No Photo</div>
                                            )}
                                        </div>

                                        {/* Overlays to simulate ID card look */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-20"></div>
                                        <div className="absolute bottom-6 left-6 z-30 text-white pointer-events-none">
                                            <div className="text-[10px] font-bold opacity-80">PREVIEW</div>
                                            <div className="text-xl font-black">SAI DHEERAJ</div>
                                        </div>
                                    </div>
                                    <p className="text-neutral-500 text-xs mt-2">Preview of how it looks on the card properly cropped.</p>
                                </div>

                                {/* Controls */}
                                <div className="flex-1 space-y-6">
                                    {/* Upload */}
                                    <div className="bg-black p-6 rounded-2xl border border-neutral-800">
                                        <label className="block text-xs font-bold text-neutral-400 uppercase mb-3">Upload New Photo</label>
                                        <label className="flex items-center gap-3 cursor-pointer bg-neutral-900 hover:bg-neutral-800 p-4 rounded-xl border border-neutral-800 transition-colors group">
                                            <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                                                {uploadingId === 'prof-idCardPhoto' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                                            </div>
                                            <span className="font-medium text-neutral-300 group-hover:text-white">Choose Image file...</span>
                                            <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, { type: 'profile', profileField: 'idCardPhoto' })} accept="image/*" />
                                        </label>
                                    </div>

                                    {/* Adjustments */}
                                    <div className="bg-black p-6 rounded-2xl border border-neutral-800 space-y-6">
                                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                            <Move className="w-4 h-4" /> Adjust Position & Scale
                                        </h3>

                                        <div>
                                            <div className="flex justify-between text-xs text-neutral-500 mb-2">
                                                <span>Scale / Zoom</span>
                                                <span className="text-white font-mono">{data.profile?.idCardConfig?.scale || 1.1}x</span>
                                            </div>
                                            <input
                                                type="range" min="0.5" max="3" step="0.1"
                                                value={data.profile?.idCardConfig?.scale || 1.1}
                                                onChange={(e) => updateProfile('config.scale', parseFloat(e.target.value))}
                                                className="w-full accent-white"
                                            />
                                        </div>

                                        <div>
                                            <div className="flex justify-between text-xs text-neutral-500 mb-2">
                                                <span>Horizontal Position (X)</span>
                                                <span className="text-white font-mono">{data.profile?.idCardConfig?.x || 0}px</span>
                                            </div>
                                            <input
                                                type="range" min="-100" max="100" step="1"
                                                value={data.profile?.idCardConfig?.x || 0}
                                                onChange={(e) => updateProfile('config.x', parseInt(e.target.value))}
                                                className="w-full accent-white"
                                            />
                                        </div>

                                        <div>
                                            <div className="flex justify-between text-xs text-neutral-500 mb-2">
                                                <span>Vertical Position (Y)</span>
                                                <span className="text-white font-mono">{data.profile?.idCardConfig?.y || 0}px</span>
                                            </div>
                                            <input
                                                type="range" min="-100" max="100" step="1"
                                                value={data.profile?.idCardConfig?.y || 0}
                                                onChange={(e) => updateProfile('config.y', parseInt(e.target.value))}
                                                className="w-full accent-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Me Photo */}
                        <div className="bg-neutral-900/50 p-8 rounded-3xl border border-neutral-800">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <ScanFace className="w-6 h-6" /> About Me Photo
                            </h2>
                            <p className="text-neutral-500 text-sm mb-6">Upload a photo to be used in the About Me section.</p>

                            <div className="flex items-start gap-6">
                                <div className="w-32 aspect-square bg-black rounded-xl border border-neutral-800 overflow-hidden relative">
                                    {data.profile?.aboutMePhoto ? (
                                        <img src={data.profile.aboutMePhoto} className="w-full h-full object-cover" alt="About Me" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-xs text-neutral-600">No Photo</div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <label className="inline-flex items-center gap-3 cursor-pointer bg-white hover:bg-neutral-200 text-black px-6 py-3 rounded-xl font-bold transition-colors">
                                        {uploadingId === 'prof-aboutMePhoto' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                                        <span>Upload Photo</span>
                                        <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, { type: 'profile', profileField: 'aboutMePhoto' })} accept="image/*" />
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Resume Upload */}
                        <div className="bg-neutral-900/50 p-8 rounded-3xl border border-neutral-800">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <FileText className="w-6 h-6" /> Resume / CV
                            </h2>
                            <p className="text-neutral-500 text-sm mb-6">Upload your latest resume (PDF recommended).</p>

                            <div className="flex items-center gap-6">
                                <div className="flex-1">
                                    <label className="inline-flex items-center gap-3 cursor-pointer bg-white hover:bg-neutral-200 text-black px-6 py-3 rounded-xl font-bold transition-colors">
                                        {uploadingId === 'prof-resumeUrl' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                                        <span>Upload Resume</span>
                                        <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, { type: 'profile', profileField: 'resumeUrl' })} accept=".pdf,.doc,.docx" />
                                    </label>
                                </div>
                                {data.profile?.resumeUrl && (
                                    <div className="flex items-center gap-4">
                                        <div className="bg-neutral-800 px-4 py-2 rounded-lg flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-white" />
                                            <span className="text-sm text-neutral-300 max-w-[200px] truncate">{data.profile.resumeUrl.split('/').pop()}</span>
                                        </div>
                                        <a href={data.profile.resumeUrl} target="_blank" rel="noreferrer" className="text-white hover:text-blue-400 text-sm font-bold underline">Test Link</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}
