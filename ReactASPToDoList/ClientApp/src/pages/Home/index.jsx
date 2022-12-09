import { Outlet, Link } from "react-router-dom"
import { useAuthContext, CLEAR_ACCESS_TOKEN } from "../../providers/AuthProvider";
import {useState} from "react";
import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    NavItem,
    NavLink,
    Nav,
  } from 'reactstrap';

export const FrontLayout = () => {
    const [{accessToken}, dispatch] = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
        return (
            <>
            <Navbar color="danger" dark expand="md">
                <NavbarBrand tag={Link} to="/">OauthDemo</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem className="mr-auto" navbar>
                            <NavLink><a href="/swagger" style={{color: "white", textDecoration: "none"}}>Swagger</a></NavLink>
                        </NavItem>
                        <NavItem>
                            {accessToken ? <NavLink tag={Link} to="/users">Uživatelé</NavLink> : null}
                        </NavItem>
                        <NavItem>
                            {accessToken ? <NavLink tag={Link} to="/tasks">Úkoly</NavLink> : null}
                        </NavItem>
                        <NavItem>
                            {!accessToken ? <NavLink tag={Link} to="/sign/in">Přihlášení</NavLink> : null}
                        </NavItem>
                        <NavItem>
                            {!accessToken ? <NavLink tag={Link} to="/sign/register">Registrace</NavLink> : null }
                        </NavItem>
                        <NavItem>
                            {accessToken ? <NavLink tag={Link} onClick={e => {dispatch({type: CLEAR_ACCESS_TOKEN})}}>Odhlášení</NavLink> : null}
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            <Container className="mt-5">
                <Outlet />
            </Container>
            </>
    );
};

export default FrontLayout;