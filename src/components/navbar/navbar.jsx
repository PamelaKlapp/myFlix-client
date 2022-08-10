import React from "react";
import { Navbar,Nav, Container, Button } from "react-bootstrap";
import "./navbar.scss";
 
export function Menubar({user}) {

    const onLoggedOut = () =>{
        localStorage.clear();
        window.open("/", "_self");
    }

    const isAuth = () =>{
        if(typeof window == "undefined"){
            return false;
        }
        if (localStorage.getItem("token")){
            return localStorage.getItem("token");
        }else {
            return false;
        }
    };

    return (
        <Navbar className="main-nav nav-bg-color" sticky="top" expand="lg">
            <Container>
                <Navbar.Brand className="navbar-logo" href="/">MyFlix MOVIE</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        {isAuth() && (
                            <Nav.Link href={"/users/${user}"}>{user}</Nav.Link>
                        )}
                        {isAuth() && (<Button variant="link" onClick={()=>{this.onLoggedOut()}}>Logout</Button>
                        )}
                        {!isAuth() && (<Nav.Link href="/login">Sign In</Nav.Link>
                        )}
                        {!isAuth() && (<Nav.Link href="/register">Sign up</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


