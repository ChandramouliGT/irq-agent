import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaShieldAlt, FaUsers } from "react-icons/fa"
import { useAuth } from "../auth/AuthContext"

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [selectedRole, setSelectedRole] = useState<"infosec" | "bro" | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    if (!selectedRole || !email || !password) return

    login(selectedRole)

    if (selectedRole === "infosec") {
      navigate("/infosec/dashboard")
    } else {
      navigate("/bro/irq")
    }
  }

  return (
    <div className="flex h-screen font-sora">

      {/* LEFT PANEL */}
      <div className="flex-1 bg-deep text-white px-12 py-10 flex flex-col justify-center overflow-hidden">

        {/* Brand */}
        <div className="flex items-center gap-3 mb-6">
          <FaShieldAlt className="text-white text-2xl" />
          <div>
            <h1 className="text-[24px] font-semibold leading-none">IRQ Agent</h1>
            <p className="text-xs text-muted mt-1">TPRM Automation Platform</p>
          </div>
        </div>

        {/* Hero */}
        <h2 className="text-[44px] md:text-[48px] leading-tight font-semibold max-w-xl">
          Vendor risk,
          <br />
          intelligently
          <br />
          automated.
        </h2>

        {/* Subtext */}
        <p className="mt-6 max-w-xl text-base leading-6 text-muted">
          AI-powered IRQ automation for InfoSec teams and Business Relationship
          Owners — grounded in your SOPs, governed by your policies.
        </p>

        {/* Use case pills */}
        <div className="mt-10 grid grid-cols-2 gap-3 max-w-xl">
          {[
            "Pre-Assessment & Intake",
            "Supplier & BRO Enablement",
            "Evidence Intake & Triage",
            "Risk Identification & Decision Support",
            "Remediation Tracking & Follow-ups",
            "Reporting, Metrics & Management Insights",
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-full bg-card px-5 py-3 text-sm text-white/90 whitespace-normal break-words"
            >
              {i + 1}. {item}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-[420px] bg-white flex items-center justify-center">
        <div className="w-full px-8">

          {/* Heading */}
          <h2 className="text-[24px] font-semibold text-gray-900">
            Sign in to IRQ Agent
          </h2>

          <p className="text-gray-500 mt-1 text-sm">
            Select your role to access the appropriate workspace
          </p>

          {/* Role Cards */}
          <div className="mt-6 space-y-4">

            {/* InfoSec */}
            <div
              onClick={() => setSelectedRole("infosec")}
              className={`rounded-xl border p-4 cursor-pointer transition
                ${
                  selectedRole === "infosec"
                    ? "border-infosec bg-blue-50 shadow-sm"
                    : "border-gray-200 hover:shadow"
                }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-infosec text-sm" />
                  <h3 className="text-sm font-semibold text-infosec">
                    InfoSec Analyst
                  </h3>
                </div>
                <span className="text-[10px] px-2 py-1 bg-blue-100 text-infosec rounded-full">
                  INTERNAL
                </span>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Internal security team — full IRQ review, risk decisions, audit
                trail, reporting.
              </p>
            </div>

            {/* BRO */}
            <div
              onClick={() => setSelectedRole("bro")}
              className={`rounded-xl border p-4 cursor-pointer transition
                ${
                  selectedRole === "bro"
                    ? "border-bro bg-green-50 shadow-sm"
                    : "border-gray-200 hover:shadow"
                }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FaUsers className="text-bro text-sm" />
                  <h3 className="text-sm font-semibold text-bro">
                    Business Relationship Owner
                  </h3>
                </div>
                <span className="text-[10px] px-2 py-1 bg-green-100 text-bro rounded-full">
                  BRO
                </span>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Vendor manager — complete IRQs with AI assistance, submit for
                InfoSec review.
              </p>
            </div>

          </div>

          {/* Login Form */}
          {selectedRole && (
            <div className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="you@yourcompany.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet"
              />

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet"
              />

              <button
                onClick={handleLogin}
                disabled={!selectedRole || !email || !password}
                className={`w-full py-3 rounded-md text-sm font-medium text-white
                  ${
                    selectedRole === "infosec"
                      ? "bg-[#111827]"
                      : "bg-infosec"
                  }
                  ${(!email || !password) && "opacity-40 cursor-not-allowed"}
                `}
              >
                {selectedRole === "infosec"
                  ? "Sign in as InfoSec Analyst"
                  : "Sign in as BRO"}
              </button>
            </div>
          )}

          {/* Footer */}
          <p className="mt-6 text-xs text-gray-400">
            Both roles operate within the same domain.
            <br />
            Access is governed by your assigned permissions.
          </p>

        </div>
      </div>
    </div>
  )
}