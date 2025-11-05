import { useState } from "react"

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { email, password } = formData

    if (!email || !password) {
      setError("All fields are required.")
      return
    }

    setError("")
    console.log("Login data:", formData)
    // TODO: connect to backend
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-950 p-8 rounded-2xl w-full max-w-xl shadow-lg border border-gray-800"
    >
      <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">
        Welcome back
      </h2>

      <div className="space-y-4">
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

        <div>
          <label className="block text-sm text-gray-300 mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {error && <p className="text-red-400 text-sm mt-3 text-center">{error}</p>}

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
