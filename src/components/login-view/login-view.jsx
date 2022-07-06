import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Container,
  Nav,
  Navbar,
  Row,
  Col,
} from "react-bootstrap";
import "./login-view.scss";
import axios from "axios";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://peliapp-heroku.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  const openRegView = (e) => {
    e.preventDefault();
    props.onRegistration(true);
  };

  return (
    <div>
      <Navbar className="nav-bg-color" expand="lg">
        <Container>
          <Navbar.Brand href="#home">MyFlix MOVIE</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">HOME</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Row>
        <Col>
          <Form className="main-form">
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="button-margin"
              onClick={handleSubmit}
            >
              Submit
            </Button>{" "}
            <Button
              variant="info"
              type="button"
              className="button-margin"
              onClick={openRegView}
            >
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

LoginView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func.isRequired,
};
