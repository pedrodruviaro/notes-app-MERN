import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { useHistory } from "react-router-dom";

// creating context
export const AuthContext = createContext();
AuthContext.displayName = "Auth Context";

// provider
export default function AuthContextProvider({ children }) {
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);

    // persists data
    useEffect(() => {
        const localUser = localStorage.getItem("user");
        if (localUser) {
            const user = JSON.parse(localUser);

            api.defaults.headers.Authorization = `${user.token}`;
            setAuthorized(true);
            setUser(user);
            history.push(`/dashboard/${user._id}`);
        }
    }, [history]);

    // login function
    async function login(credentials) {
        if (user) {
            history.push(`/dashboard/${user._id}`);
        }

        try {
            const { data } = await api.post("/api/auth/login", credentials);

            if (data) {
                console.log(data);

                // set header
                localStorage.setItem("user", JSON.stringify(data));
                api.defaults.headers.Authorization = `${data.token}`;
                setAuthorized(true);
                setUser(data);

                history.push(`/dashboard/${data._id}`);
            }
        } catch (error) {
            setUser(null);
            return error.response.data;
        }
    }

    // logout user
    async function logout() {
        setAuthorized(false);
        setUser(null);
        localStorage.removeItem("user");
        api.defaults.headers.Authorization = undefined;
        history.push("/login");
    }

    // register a user
    async function register(credentials) {
        try {
            const resp = await api.post("/api/auth/register", credentials);

            if (resp.status === 200 && resp.data) {
                const { email, password } = credentials;
                login({ email, password });
            }
        } catch (err) {
            setUser(null);
            return err.response.data;
        }
    }

    return (
        <AuthContext.Provider
            value={{ user, authorized, login, logout, register }}
        >
            {children}
        </AuthContext.Provider>
    );
}
