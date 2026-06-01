import { Routes, Route, useNavigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import ProtectedRoute from "./auth/ProtectedRoute"
import { useAuth } from "./auth/AuthContext"

function InfosecDashboard() {
  const { logout, role } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">InfoSec Dashboard ✅</h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md"
        >
          Logout
        </button>
      </div>

      <p className="text-sm text-gray-500">Logged in as: {role}</p>
    </div>
  )
}

function BroPage() {
  const { logout, role } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">BRO Page ✅</h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md"
        >
          Logout
        </button>
      </div>

      <p className="text-sm text-gray-500">Logged in as: {role}</p>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/infosec/dashboard"
        element={
          <ProtectedRoute>
            <InfosecDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bro/irq"
        element={
          <ProtectedRoute>
            <BroPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App