
import { Route, Routes } from "react-router-dom"
import Welcome from "./pages/Welcome"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Dashboard from "./components/dashboard/Dashboard"

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome/>}  />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </div>
  )
}