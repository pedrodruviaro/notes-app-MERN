import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContextProvider from "./context/authContext";
import Routes from "./routes";

export default function App() {
    return (
        <Router>
            <AuthContextProvider>
                <Routes />
            </AuthContextProvider>
        </Router>
    );
}
