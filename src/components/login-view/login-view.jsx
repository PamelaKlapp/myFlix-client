import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Form, Button, Card, CardGroup, Row, Col} from 'react-bootstrap';

import './login-view.scss'

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  // Declare hook for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  // validate user inputs
const validate = () => {
  let isReq = true;
  if(!username){
   setUsernameErr('Username Required');
   isReq = false;
  }else if(username.length < 2){
   setUsernameErr('Username must be 2 characters long');
   isReq = false;
  }
  if(!password){
   setPasswordErr('Password Required');
   isReq = false;
  }else if(password.length < 6){
   setPassword('Password must be 6 characters long');
   isReq = false;
  }

  return isReq;
}


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    const isReq = validate();
    if(isReq) {
   
    /* Send a request to the server for authentication */
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
  

  return (
      <Row className="row justify-content-md-center">
        <Col md={7}>
          <CardGroup>
            <Card>
              <Card.Body className="card-body">
              <Card.Title className="text-center"><h1 className='color-h1'>Login</h1></Card.Title>
              <Card.Subtitle className="text-center mb-2 text-muted">Nice to see you back!</Card.Subtitle>
              <Form>
               
                <Form.Group className="mt-3" controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text" onChange={e => setUsername(e.target.value)} required placeholder='Enter username' />
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>
          
                <Form.Group className="mt-3" controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" onChange={e => setPassword(e.target.value)} required placeholder='Enter password' minLength={8} />
                  {passwordErr && <p>{passwordErr}</p>}
                  <Form.Text id="passwordHelpBlock" muted>Your password must be 8 characters long.</Form.Text>
                </Form.Group>
                <Button className="mt-5 button" variant="primary" type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
      
    );
  }


  LoginView.propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
  };