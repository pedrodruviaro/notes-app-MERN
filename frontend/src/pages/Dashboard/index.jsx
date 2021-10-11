import React from "react";
import { useAuth } from "../../hooks/useAuth";

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <>
            <h1>Hello {user.username}</h1>
            <h2>{user.email}</h2>
        </>
    );
}
