import { useEffect } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, role, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const token = sessionStorage.getItem("token")

  useEffect(() => {
    if (!isAuthenticated || !token) return

    // Push a history state so back gesture on protected pages triggers popstate
    window.history.pushState({ protected: true }, "", window.location.href)

    const handlePopState = () => {
      logout()
      navigate("/", { replace: true })
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [isAuthenticated, token, logout, navigate, location.pathname])

  // Not logged in or no token
  if (!isAuthenticated || !token) {
    return <Navigate to="/" replace />
  }

  // Role-based access control
  if (role === "bro" && location.pathname.startsWith("/infosec")) {
    return <Navigate to="/" replace />
  }

  if (role === "infosec" && location.pathname.startsWith("/bro")) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
