import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Card, CardGroup, Row, Col} from 'react-bootstrap';

import './registration-view.scss';



export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail] = useState('');
  const [ birthday, setBirthday] = useState('');
  
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const [ emailErr, setEmailErr ] = useState('');
  const [ birthdayErr, setBirthdayErr ] = useState('');


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
    if(!email){
      setEmailErr('Email Required');
      isReq = false;
     }else if(indexOf('@') === -1){
      setEmail('Email must be valid');
      isReq = false;
     }
     if(!birthday){
      setBirthdayErr('Birthday Required');
      isReq = false;
     }else if(birthday.length<3){
      setBirthday('Birthday must be valid');
      isReq = false;
     }

    return isReq;
}

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    const isReq = validate();
    if(isReq) {
    /* Send request to the server for authentication */
    axios.post('https://peliapp-heroku.herokuapp.com/register', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
    })
    .then(response =>{
        const data = response.data;
        props.onRegistration(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  }
};

  return (
    <Row className="justify-content-md-center">
      <Col md={7}>
        <CardGroup >
          <Card>
            <Card.Body className="card-body">
              <Card.Title className="text-center"><h1 className='color-h1'>Register Now</h1></Card.Title>
                <Card.Subtitle className="text-center mb-2 text-muted">And be part of the Flix-comunity</Card.Subtitle>
                  <Form>
                    <Form.Group className="mt-3" controlId="formUsername">
                      <Form.Label>Username:</Form.Label>
                      <Form.Control type="text" onChange={e => setUsername(e.target.value)} required placeholder='Enter username' />
                      {usernameErr && <p>{usernameErr}</p>}
                    </Form.Group>

                    <Form.Group className="mt-3" controlId="formPassword">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control type="password" onChange={e => setPassword(e.target.value)} required placeholder='Enter password' minLength={8} />
                      <Form.Text id="passwordHelpBlock" muted>Your password must be 8 characters long.</Form.Text>
                      {passwordErr && <p>{passwordErr}</p>}
                    </Form.Group>

                    <Form.Group className="mt-3" controlId="formemail">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control type="email" onChange={e => setEmail(e.target.value)} required placeholder='Enter email' />
                      {emailErr && <p>{emaildErr}</p>}
                    </Form.Group>

                    <Form.Group className="mt-3" controlId="formBirthday">
                      <Form.Label>Birthday:</Form.Label>
                      <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
                      {birthdayErr && <p>{birthdayErr}</p>}
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

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};
