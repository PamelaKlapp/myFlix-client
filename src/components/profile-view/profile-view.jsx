import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Row, Col, Card, Figure } from "react-bootstrap";


import "./profile-view.scss";

export class ProfileView extends React.Component{

  constructor(){
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavouriteMovies: []
    };
  }


  componentDidMount() {
    let accessToken = localStorage.getItem('token');
      this.getUser(accessToken);
    }
  

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  };

  getUser(token) {
    axios.get('https://peliapp-heroku.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday,
        FavouriteMovies: response.data.FavouriteMovies
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  editUser(e) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.put(`https://peliapp-heroku.herokuapp.com/users/${username}`,
      {
        Username: this.state.Username,
        Password: this.state.Password,
        Email: this.state.Email,
        Birthday: this.state.Birthday
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday
        });
        localStorage.setItem('user', this.state.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert("Profile updated.");
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  deleteUser() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios.delete(`https://peliapp-heroku.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response);
        alert('Profile has been deleted.');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/', '_self');
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  setUsername(value) {
    this.state.Username = value;
  }
  
  setPassword(value) {
    this.state.Password = value;
  }
  
  setEmail(value) {
    this.state.Email = value;
  }
  
  setBirthday(value) {
    this.state.Birthday = value;
  }



render() {
  const { moviesObject } = this.props;
  const {  Username, Password, Email, Birthday, FavouriteMovies } = this.state;

return (
    <div>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
                <h4>Your Profile</h4>
              <p>Name: {Username}</p>
              <p>Email: {Email}</p>
              <p>Password: {Password}</p>
              <p>Birthday: {Birthday}</p>
            <Row>
                <Col xs={12}>
                <h4>Favorite Movies</h4>
                </Col>
            </Row>
            <Row>
              {favouriteMovieList.map((ImagePath, Title, _id) => {
                return (
                  <Col xs={12} md={6} lg={3} key={moviesObject._id} className="fav-movie">
                      <Figure>
                      <Link to={`/movies/${_id}`}>
                        <Figure.Image 
                        src={ImagePath}
                        alt={Title}
                        />
                        <Figure.Caption>
                            Title
                        </Figure.Caption>
                        </Link>
                      </Figure>
                    
                     <Button
                      variant="secondary"
                      onClick={() => removeFav(moviesObject._id)}>
                      Remove from list
                    </Button>
                  </Col>
                );
              })}
              </Row>

            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={8}></Col>
      </Row>
      <UpdateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
    </div>
  );

}
}

ProfileView.propTypes = {
  profile: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  })
};