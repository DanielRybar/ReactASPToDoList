import {Outlet, Link} from "react-router-dom";
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

export const TaskLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
        <Navbar color="danger" dark expand="md">
            <NavbarBrand tag={Link} to="/">OauthDemo</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/">Domů</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/tasks">Úkoly</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/tasks/add">Přidat</NavLink>
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

export default TaskLayout;