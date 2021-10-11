import { Switch, Route } from "react-router-dom";

// pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

export default function routes() {
    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/dashboard/:id" component={Dashboard} />
        </Switch>
    );
}
