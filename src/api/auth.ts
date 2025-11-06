import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL

export const loginAPI = async (email: string, password: string) => {
    const res = await axios.post(`${API_BASE_URL}/auth/auth/login`, {
        email,
        password
    })

    return res.data
}

export const SignupAPI = async(
    username: string, 
    email: string,
    password: string) => {
    
    const res = await axios.post(`${API_BASE_URL}/auth/auth/register`, {
        username, 
        email, 
        password
    })

    return res.data
}