import { createContext, useContext, useEffect, useState } from "react"

type Role = "infosec" | "bro" | null

interface AuthContextType {
  isAuthenticated: boolean
  role: Role
  login: (role: Role) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [role, setRole] = useState<Role>(null)

  // Restore auth only for the current browser tab/session
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token")
    const storedRole = sessionStorage.getItem("role") as Role

    if (storedToken && storedRole) {
      setIsAuthenticated(true)
      setRole(storedRole)
    }
  }, [])

  const login = (selectedRole: Role) => {
    const fakeToken = "token_" + Math.random().toString(36).substring(2)

    setIsAuthenticated(true)
    setRole(selectedRole)

    sessionStorage.setItem("token", fakeToken)
    sessionStorage.setItem("role", selectedRole as string)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setRole(null)

    sessionStorage.removeItem("token")
    sessionStorage.removeItem("role")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return context
}
