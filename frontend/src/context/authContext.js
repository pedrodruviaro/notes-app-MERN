import { createContext, useState } from "react";
import api from "../services/api";

// creating context
export const AuthContext = createContext();
AuthContext.displayName = "Auth Context";

// provider
export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);

    // login function
    async function login(credentials) {
        console.log(user);
        try {
            const { data } = await api.post("/api/auth/login", credentials);

            if (data) {
                setAuthorized(true);
                setUser(data);
                console.log(data);
                return data;
            }
        } catch (error) {
            return error.response.data;
        }
    }

    return (
        <AuthContext.Provider value={{ user, authorized, login }}>
            {children}
        </AuthContext.Provider>
    );
}
