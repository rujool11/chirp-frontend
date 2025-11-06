import { useState } from "react"
import { Github, Linkedin, Anchor } from "lucide-react"
import LoginForm from "../components/auth/LoginForm"
import SignupForm from "../components/auth/SignupForm"

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="flex min-h-screen">
      {/*branding */}
      <div className="hidden md:flex w-2/5 bg-gray-950 flex-col justify-center items-center p-10 border-gray-600 border-r-[0.5px]">
        <Anchor size={150} color="white" className="mb-4" />
        
        <h1 className="text-7xl font-extrabold mb-4 text-blue-500">Chirp</h1>
        <h1 className="text-4xl font-extrabold mb-2 text-blue-600">
          {isLogin ? "Welcome back" : "Join today"}
        </h1>

        <h3
          className="text-blue-300 font-medium mt-2 hover:underline cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Not a user? Sign up" : "Returning user? Log in"}
        </h3>

        {/* social links */}
        <div className="mt-10 flex items-center space-x-4 text-blue-300">
          <a
            href="https://github.com/rujool11"
            target='_blank'
            rel="noopener noreferrer"
          >
            <Github className="cursor-pointer hover:text-white transition" size={28} />
          </a>
          <a
            href="https://www.linkedin.com/in/rujoolpatil"
            target='_blank'
            rel="noopener noreferrer"
          >
            <Linkedin className="cursor-pointer hover:text-white transition" size={28} />
          </a>
        </div>
      </div>

      {/* form */}
      <div className="flex-1 bg-gray-900 flex justify-center items-center p-8">
        {isLogin ? (
          <LoginForm/>
        ) : (
          <SignupForm/>
        )}
      </div>
    </div>
  )
}

export default AuthPage
