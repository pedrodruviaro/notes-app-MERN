import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, TextField } from "@material-ui/core";
import { Box } from "@material-ui/system";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const history = useHistory();
    const { login } = useAuth();

    // handle error
    function showError(err) {
        setTimeout(() => {
            setError("");
        }, [2500]);

        return (
            <span style={{ color: "lightcoral", fontWeight: 600 }}>{err}</span>
        );
    }

    // handle the login
    async function handleSubmit(e) {
        e.preventDefault();

        const credentials = {
            email,
            password,
        };

        const resp = await login(credentials);

        if (typeof resp === "object" && resp !== undefined) {
            history.push(`/dashboard/${resp._id}`);
        }

        if (typeof resp === "string") {
            setError(resp);
            return;
        } else {
        }
    }

    return (
        <Container maxWidth="sm">
            <h1>Login</h1>

            {error ? showError(error) : ""}

            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    variant="standard"
                    fullWidth
                    required
                    margin="normal"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    variant="standard"
                    type="password"
                    fullWidth
                    required
                    margin="normal"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained">
                    Contained
                </Button>
            </Box>
        </Container>
    );
}
