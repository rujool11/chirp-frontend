import { useState } from "react"
import { toast } from "react-toastify"
import { Eye, EyeOff } from "lucide-react"

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { username, email, password, confirmPassword } = formData

    // check for empty fields
    if (!username || !email || !password || !confirmPassword) {
      toast.error("all fields are required", {
        position: "top-right",
        theme: "dark",
      })
      return
    }

    // check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error("please enter a valid email", {
        position: "top-right",
        theme: "dark",
      })
      return
    }

    // check password match
    if (password !== confirmPassword) {
      toast.error("passwords do not match", {
        position: "top-right",
        theme: "dark",
      })
      return
    }
    
    // TODO: connect to backend
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="bg-gray-950 p-8 rounded-2xl w-full max-w-xl shadow-lg border border-gray-800"
    >
      <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">
        Create an account
      </h2>

      <div className="space-y-4">
        {/* username */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* email */}
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

        {/* password */}
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
            className="absolute right-3 top-9 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>

        {/* confirm password */}
        <div className="relative">
          <label className="block text-sm text-gray-300 mb-1">
            Confirm password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full bg-gray-900 text-white p-3 pr-10 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div
            className="absolute right-3 top-9 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-lg"
      >
        Sign up
      </button>
    </form>
  )
}

export default SignupForm
