import React from 'react';
import axios from 'axios';

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
        const { movies, selectedMovie, user } = this.state;

        if (!user && regViewOpener === false) 
        return ( <LoginView 
        onLoggedIn={(user) => this.onLoggedIn(user)}
        onRegistration={(bool) => {this.onRegistration(bool)}} />);

        if (regViewOpener === true) return <RegistrationView/> 

        if (movies.length === 0) return <div className="main-view"/>;
    
        return (
          <div className="main-view">
            {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
              ))
            }
          </div>
        );
    }
}

export default MainView;