import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function PrivateRoute({ component: Component, ...rest }) {
    const { authorized } = useAuth();

    return (
        <Route
            {...rest}
            render={(props) => {
                if (authorized) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    );
                }
            }}
        />
    );
}
