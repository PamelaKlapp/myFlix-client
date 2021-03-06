import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import "./login-view.scss";
import axios from "axios";
import { Link } from "react-router-dom";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
// Declare hook for each input
const [ usernameErr, setUsernameErr ] = useState('');
const [ passwordErr, setPasswordErr ] = useState('');

// validate user inputs
const validate = () => {
  let isReq = true;
  if(!username){
   setUsernameErr('Username Required');
   isReq = false;
  }else if(username.length < 6){
   setUsernameErr('Username must be 6 characters long');
   isReq = false;
  }
  if(!password){
   setPasswordErr('Password Required');
   isReq = false;
  }else if(password.length < 8){
   setPassword('Password must be 8 characters long');
   isReq = false;
  }

  return isReq;
}

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq){
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
    }
  };
  

  const openRegView = (e) => {
    e.preventDefault();
    props.onRegistration(true);
  };

  return (

      <Row>
        <Col>
          <Form className="main-form">
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text" 
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordErr && <p>{passwordErr}</p>}
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
  );
}

LoginView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func.isRequired,
};
