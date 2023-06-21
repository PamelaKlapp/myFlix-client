import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//IMPORT COMPONENTS
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Navbar } from '../navbar/navbar';


//IMPORT BOOTSTRAP
import {Row, Col, Button} from 'react-bootstrap';


export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      moviesObject: [],
      user: null,
    }
  }

  getMovies(token) {
    axios.get('https://peliapp-heroku.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onRegistration(register){
    this.setState({
      register
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }
  

  render() {
    const {moviesObject, user, register} = this.state;

    //REGISTRATION WINDOW
     //if(!register) return <RegistrationView onRegistration={register => this.onRegistration(register)}/>;

    //LOGIN WINDOW
     //if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;


    <MovieCard/>


    //  if (moviesObject.length === 0) return <div className="main-view"/>; 
    
    return (
      <Router>
        <Navbar user={user}/>
          <Row className=" main-view justify-content-md-center">
            <Routes>
           
            <Route exact path="/" render={() => {
              if(!user) return 
                <Col> 
                  <LoginView movies={moviesObject} onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              
              if (moviesObject.length === 0) return <div className="main-view"/>; 

              return moviesObject.map(xdeMap => (
                <Col md={3} key={xdeMap._id}>
                  <MovieCard nombreProp={xdeMap} />
                </Col>
              ))
            }} />  

            <Route path="/register" render={() =>{
              if (user) return <Redirect to="/"/>
              return <Col lg={8} md={8}>
                <RegistrationView/>
              </Col>
            }} />

            <Route path="/users/:username" render={({ history}) => {
              if(!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
              </Col>
                  
              if (moviesObject.length === 0 ) return <div className="main-view" />;

              return <ProfileView moviesObject={moviesObject} user={user} onBlackClick={() => history.goBack()}/>
            }}/>

            <Route path="/movies/:movieId" render={({ match, history }) => {

              if(!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
              </Col>

              if (moviesObject.length === 0 ) return <div className="main-view" />;

              return <Col md={8}>
                <MovieView nombreProp={movies.find(xdeMap => xdeMap._id === match.params.movieId)} onBackClick={()=> 
                history.goBack()} />
              </Col>
            }} />

            <Route path="/genre/:Name" render={({ match, history }) => {
                
              if (!user) return <Col>
                <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
              </Col>

              if (moviesObject.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find((m) => m.Genre.Name === match.params.name).Genre}onBlackClick={() => history.goBack()}/>
              </Col>
            }}/>

            <Route path="/directors/:Name" render={({ match, history }) => {
              
              if (!user) return <Col>
                <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
              </Col>

              if (moviesObject.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView  director={movies.find((m) => m.Director.Name === match.params.name).Director} onBlackClick={() => history.goBack()}/>
              </Col>
            }}/>

            <Route path={`/users/${user}`} render={({ history }) => {
              
              if (!user) return <Redirect to="/" />;
              return <Col>
                <ProfileView user={user} onBackClick={() => history.goBack()}/>
              </Col>
            }}/>


          </Routes>


          <Button variant="primary" onClick={() => { this.onLoggedOut() }}>Bye</Button>
      </Row>
      </Router> 
    );
    
  }
}

