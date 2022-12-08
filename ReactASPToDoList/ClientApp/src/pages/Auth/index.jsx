import {Outlet, Link, useNavigate} from "react-router-dom";

export const AuthLayout = () => {
    return (
        <>
            <menu>
                <li><Link to="/">Home</Link></li>
            </menu>
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default AuthLayout;