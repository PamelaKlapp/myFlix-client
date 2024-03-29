import React from "react";
import { Container, Nav, Navbar, Button, } from "react-bootstrap";

import './navbar.scss';

export function Navbar({user}) {

    const onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    }

    const isAuth = () => {
        if(typeof window == "undefined"){
            return false;
        }
        if (localStorage.getItem("token")){
            return localStorage.getItem("token");
        }else {
            return false;
        }
    };

    return(

        <Navbar className="main-nav background-nav" sticky="top" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand className="navbar-logo" href="/">MyMovie</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {isAuth() && (
                            <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
                        )}
                        {isAuth() && (
                            <Button variant="link" onClick={()=>{this.onLoggedOut()}}>Logout</Button>
                        )}
                        {!isAuth() && (
                            <Nav.Link  href="/">Sign-in</Nav.Link>
                        )}
                        {!isAuth() && (
                            <Nav.Link href="/register">Sign-up</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
