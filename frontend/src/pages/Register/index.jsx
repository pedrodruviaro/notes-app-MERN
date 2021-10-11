import { useState } from "react";
import { Button, Container, TextField } from "@material-ui/core";
import { Box } from "@material-ui/system";
import { useAuth } from "../../hooks/useAuth";
export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const { register } = useAuth();

    // handle error
    function showError(err) {
        setTimeout(() => {
            setError("");
        }, [2500]);

        return (
            <span style={{ color: "lightcoral", fontWeight: 600 }}>{err}</span>
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const newUser = { username, email, password };

        const response = await register(newUser);

        if (response !== undefined) {
            setError(response);
        }
    }

    return (
        <Container maxWidth="sm">
            <h1>Create an new account</h1>
            {error ? showError(error) : ""}
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    required
                    label="Email"
                    variant="standard"
                    margin="normal"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    required
                    label="Username"
                    variant="standard"
                    margin="normal"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    fullWidth
                    required
                    label="Password"
                    variant="standard"
                    type="password"
                    margin="normal"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained">
                    Create Account
                </Button>
            </Box>
        </Container>
    );
}
