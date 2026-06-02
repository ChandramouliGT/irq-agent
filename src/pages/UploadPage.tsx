console.log("NEW UploadPage loaded ✅")

import { useRef, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import { FaUpload } from "react-icons/fa"

export default function UploadPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const inputRef = useRef<HTMLInputElement | null>(null)

  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const [vendorName, setVendorName] = useState("")
  const [vendorType, setVendorType] = useState("")
  const [dataClassification, setDataClassification] = useState("")
  const [criticality, setCriticality] = useState("")

  const [jobId, setJobId] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const resetSelectedFile = () => {
    setFile(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  const validateFile = (selectedFile: File) => {
    const fileName = selectedFile.name.toLowerCase()

    if (!fileName.endsWith(".xlsx")) {
      setError("Only .xlsx files are allowed.")
      resetSelectedFile()
      return false
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      setError("File size must be less than 50 MB.")
      resetSelectedFile()
      return false
    }

    setError("")
    return true
  }

  const handleFileSelection = (selectedFile: File | null) => {
    if (!selectedFile) return
    if (!validateFile(selectedFile)) return
    setFile(selectedFile)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null
    handleFileSelection(selectedFile)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(false)
    const droppedFile = e.dataTransfer.files?.[0] ?? null
    handleFileSelection(droppedFile)
  }

  const handleSubmit = async () => {
    if (!file) return
    if (!vendorName || !vendorType || !dataClassification || !criticality) {
      setError("Please fill all fields.")
      return
    }

    setLoading(true)
    setError("")
    setJobId("")

    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await axios.post("/irq/upload", formData)
      setJobId(res?.data?.job_id || "JOB12345")
    } catch {
      setError("Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3ecff] via-[#e8fbf9] to-[#fff4ef] p-12">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-semibold text-[#1A0533] tracking-tight">
          Upload IRQ File
        </h1>

        <button
          onClick={handleLogout}
          className="px-5 py-2 text-sm bg-[#1A0533] text-white rounded-lg shadow hover:shadow-lg hover:bg-[#2a0a55] transition"
        >
          Logout
        </button>
      </div>

      {/* MAIN CARD */}
      <div className="rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] p-10 border border-gray-100 bg-gradient-to-br from-[#f4f0ff] via-[#f0fbfa] to-[#fff7f2]">

        {/* UPLOAD ZONE */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-14 text-center cursor-pointer transition-all
          ${
            dragActive
              ? "border-[#6B46C1] bg-gradient-to-r from-purple-100 via-green-50 to-orange-50 scale-[1.01]"
              : "border-gray-300 bg-gradient-to-r from-purple-50 via-green-50 to-orange-50 hover:border-[#6B46C1]"
          }`}
        >
          <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-full bg-gradient-to-r from-[#6B46C1] via-[#0EA5A8] to-[#FF8A2A] text-white shadow-inner">
            <FaUpload className="text-xl" />
          </div>

          <p className="text-gray-700 font-semibold">
            Drag & drop your Excel file here
          </p>

          <p className="text-sm text-gray-500 mt-1 mb-5">
            or click to browse your device
          </p>

          <button className="px-6 py-2 bg-[#6B46C1] text-white rounded-md text-sm shadow-md hover:bg-purple-700 transition">
            Browse File
          </button>

          <input
            ref={inputRef}
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* FILE PREVIEW */}
        {file && (
          <div className="mt-5 text-sm text-[#1A0533] bg-purple-50 border border-purple-100 px-4 py-2 rounded-md">
            ✅ Selected: <span className="font-medium">{file.name}</span>
          </div>
        )}

        {/* FORM */}
        <div className="mt-10 grid grid-cols-2 gap-6">

          <input
            type="text"
            placeholder="Vendor Name"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            className="bg-purple-50 border border-purple-200 rounded-md p-3 text-sm focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="text"
            placeholder="Vendor Type"
            value={vendorType}
            onChange={(e) => setVendorType(e.target.value)}
            className="bg-green-50 border border-green-200 rounded-md p-3 text-sm focus:ring-2 focus:ring-green-500"
          />

          {/* ✅ DATA CLASSIFICATION DROPDOWN */}
          <select
            value={dataClassification}
            onChange={(e) => setDataClassification(e.target.value)}
            className="bg-orange-50 border border-orange-200 rounded-md p-3 text-sm focus:ring-2 focus:ring-orange-400"
          >
            <option value="">Select Data Classification</option>
            <option value="Public">Public</option>
            <option value="Internal">Internal</option>
            <option value="Confidential">Confidential</option>
            <option value="Sensitive">Sensitive</option>
          </select>

          {/* ✅ CRITICALITY DROPDOWN (TEAL / L COLOR) */}
          <select
            value={criticality}
            onChange={(e) => setCriticality(e.target.value)}
            className="bg-teal-50 border border-teal-200 rounded-md p-3 text-sm focus:ring-2 focus:ring-teal-400"
          >
            <option value="">Select Criticality</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-10 w-full py-3 bg-gradient-to-r from-[#1A0533] via-purple-700 to-[#6B46C1] text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition"
        >
          {loading ? "Uploading..." : "Upload & Start"}
        </button>

        {/* ERROR */}
        {error && (
          <div className="mt-4 text-red-600 text-sm bg-red-50 border border-red-100 px-4 py-2 rounded-md">
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {jobId && (
          <div className="mt-4 text-green-600 text-sm bg-green-50 border border-green-100 px-4 py-2 rounded-md">
            ✅ Job ID: {jobId}
          </div>
        )}

      </div>
    </div>
  )
}