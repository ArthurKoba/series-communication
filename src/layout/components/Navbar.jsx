import React from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import {Nav, Navbar as NavbarBootstrap, NavItem, NavLink} from "react-bootstrap";

const Navbar = () => {
    return (
        <NavbarBootstrap variant="dark">
            <Nav>
                <NavItem>
                    <LinkContainer to="/">
                        <NavLink href={"/"}>Main</NavLink>
                    </LinkContainer>
                </NavItem>
                <NavItem>
                    <LinkContainer to="/serial">
                        <NavLink href={"/"}>Serial Ports</NavLink>
                    </LinkContainer>
                </NavItem>
                <NavItem>
                    <LinkContainer to="/dataStreams">
                        <NavLink href={"/"}>Data Streams</NavLink>
                    </LinkContainer>
                </NavItem>
                <NavItem>
                    <LinkContainer to="/generators">
                        <NavLink href={"/"}>Generators</NavLink>
                    </LinkContainer>
                </NavItem>
            </Nav>
        </NavbarBootstrap>
    );
};

export default Navbar;