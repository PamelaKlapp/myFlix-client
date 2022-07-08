import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Card,
  CardGroup,

  Col,
  Row,
 
} from "react-bootstrap";
import "./registration-view.scss";
import { Link } from "react-router-dom";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const [ emailErr, setEmailErr] = useState('');
  const [birthdayErr, setBirthdayErr] = useState('');

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
     setPassword('');
     isReq = false;
    }
    if(!email){
      setEmailErr('Email Required');
      isReq = false;
    } else if(email.indexOf('@') === -1){
      setEmail('Valid email is required');
      isReq = false
    }
    if(!birthday){
      setBirthdayErr('Birthday Required');
      isReq = false;
    }

    return isReq;
}

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
  if(isReq) {
    axios.post('https://peliapp-heroku.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); 
    })
    .catch(e => {
      console.log('error registering the user')
    });
  };
}

  return (
    
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Make an account</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Enter Username"
                    />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter your Password"
                    />
                    {passwordErr && <p>{passwordErr}</p>}
                    <Form.Text className="text-muted">
                      Password must contain a minimun of 8 charachters
                    </Form.Text>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter Email"
                    />
                    {emailErr && <p>{emailErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="birthday"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      placeholder="Enter Birthday"
                    />
                    {birthdayErr && <p>{birthdayErr}</p>}
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="info"
                    style={{ marginTop: "2%" }}
                    onClick={handleSubmit}
                  >
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
