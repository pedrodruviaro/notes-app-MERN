import React from "react";
import { useAuth } from "../../hooks/useAuth";

export default function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <>
            <button onClick={logout}>LOGOUT</button>
            <h1>Hello {user.username}</h1>
            <h2>{user.email}</h2>
            <form>
                <input type="text" placeholder="Category" />
                <textarea placeholder="Note" />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}
