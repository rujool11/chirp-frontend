import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type User = {
    id: string 
    email: string
    username?: string // optional
}

type AuthContextType = {
    user: User | null
    isLoggedIn: boolean
    // func signatures
    login: (token: string, user: User) => void  
    logout: () => void 
}

// default undefined so we use generics
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({children}: {children: ReactNode}) => {

    const [user, setUser] =  useState<User | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")

        // if not found will evaluate to false
        if (storedToken && storedUser) {
            setIsLoggedIn(true)
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = (token: string, user: User) => {
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setUser(user)
        setIsLoggedIn(true)
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setIsLoggedIn(false)
        setUser(null)
    }


    return (
        <AuthContext.Provider value={{user, isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
    return ctx
}




