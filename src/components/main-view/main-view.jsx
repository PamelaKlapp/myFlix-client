import React from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { RegistrationView } from '../registration-view/registration-view';
import  {LoginView} from '../login-view/login-view';
import  MovieCard  from '../movie-card/movie-card';
import  MovieView  from '../movie-view/movie-view';

class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
          movies: [],
          selectedMovie: null,
          user: null,
          regViewOpener: false,
        }
      }
     
    componentDidMount(){
    axios.get('https://peliapp-heroku.herokuapp.com/movies')
        .then(response => {
        this.setState({
            movies: response.data
        });
        })
        .catch(error => {
        console.log(error);
        });
    }

    setSelectedMovie(movie) {
        this.setState({
          selectedMovie: movie
        });
    }

    onLoggedIn(user) {
      this.setState({
        user
      });
    }
    
    onRegistration(bool) {
      this.setState({
        regViewOpener: bool,
      })
    }
    
    render() {
        const { movies, selectedMovie, user, regViewOpener } = this.state;

        if (!user && regViewOpener === false) 
        return ( <LoginView 
        onLoggedIn={(user) => this.onLoggedIn(user)}
        onRegistration={(bool) => {this.onRegistration(bool);}} />);

        if (regViewOpener === true && !user) 
        return < RegistrationView
           onRegistration={(bool) => this.onRegistration(bool)} 
          />; 
        

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    
        if (movies.length === 0) return <div className="main-view"/>;
        
        if (regViewOpener === true) return <RegistrationView/>
    
        return (
          <Row className="main-view justify-content-md-center">
            {selectedMovie
              ? (
                <Col md={8}>
                  <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                </Col>
              )
              : movies.map(movie => (
                <Col md={3}>
                  <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                </Col>
              ))
            }
          </Row>
          );
    }
}

export default MainView;