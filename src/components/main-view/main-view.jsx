import React from "react";
import axios from "axios";

import {
  Row,
  Col,
  Navbar,
  Nav,
  Container,
  NavDropdown,
} from "react-bootstrap/";

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      regViewOpener: false,
    };
  }

  componentDidMount() {
    axios
      .get("https://peliapp-heroku.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  onRegistration(bool) {
    this.setState({
      regViewOpener: bool,
    });
  }

  render() {
    const { movies, selectedMovie, user, regViewOpener } = this.state;

    if (!user && regViewOpener === false)
      return (
        <LoginView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          onRegistration={(bool) => {
            this.onRegistration(bool);
          }}
        />
      );

    if (regViewOpener === true && !user)
      return (
        <RegistrationView
          onRegistration={(bool) => this.onRegistration(bool)}
        />
      );

    if (movies.length === 0) return <div className="main-view" />;

    if (regViewOpener === true) return <RegistrationView />;

    return (
      <div>
        <Navbar className="nav-bg-color" expand="lg">
          <Container>
            <Navbar.Brand href="#home">MyFlix MOVIE</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">HOME</Nav.Link>
                <Nav.Link href="#home">MY ACCOUNT</Nav.Link>
                <Nav.Link href="#home">MY MOVIES</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Row className="main-view justify-content-md-center">
          {selectedMovie ? (
            <Col md={8}>
              <MovieView
                movie={selectedMovie}
                onBackClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ) : (
            movies.map((movie) => (
              <Col md={3} key={movie._id}>
                <MovieCard
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    this.setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))
          )}
        </Row>
      </div>
    );
  }
}

export default MainView;
