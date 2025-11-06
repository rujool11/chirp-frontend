import { useState } from "react"
import { toast } from "react-toastify"
import { Eye, EyeOff } from "lucide-react"
import { loginAPI } from "../../api/auth"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()
  const { login } = useAuth()

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { email, password } = formData

    if (!email || !password) {
      toast.warn("Please fill out all the fields", {
        position: "top-right",
        theme: "dark",
        autoClose: 2500,
      })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address", {
        position: "top-right",
        theme: "dark",
        autoClose: 2500,
      })
      return
    }

    try {
      const data = await loginAPI(formData.email, formData.password)
      login(data.token, data.user)
      toast.success("Logged in successfully", {
        theme: "dark", 
        autoClose: 2500,
        position: "top-center"
      })

      navigate("/home")

    } catch (err: any) {

    const message =
      err.response?.data?.error || // from Go backend { "error": "msg" }
      err.message || // axios/network errors
      "Login failed" // fallback

      toast.error(message, {
        theme: "dark",
        position: "top-right",
        autoClose: 2500
      })

    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="bg-gray-950 p-8 rounded-2xl w-full max-w-xl shadow-lg border border-gray-800"
    >
      <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">
        Welcome back
      </h2>

      <div className="space-y-4">
        {/* email field */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* password field (fixed) */}
        <div className="relative">
          <label className="block text-sm text-gray-300 mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-gray-900 text-white p-3 pr-10 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400 cursor-pointer"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-lg"
      >
        Log In
      </button>
    </form>
  )
}

export default LoginForm
