import React from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, Card, Figure } from "react-bootstrap";
import { UpdateUser } from "./update-user";
import "./profile-view.scss";

export function ProfileView({ email, name }) {
  return (
    <div>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
                <h4>Your Info</h4>
              <p>Name: {name}</p>
              <p>Email: {email}</p>
            <Row>
                <Col xs={12}>
                <h4>Favorite Movies</h4>
                </Col>
            </Row>
            <Row>
              {favoriteMovieList.map((ImagePath, Title, _id) => {
                return (
                  <Col xs={12} md={6} lg={3} key={movies._id} className="fav-movie">
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
                      onClick={() => removeFav(movies._id)}>
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

export default ProfileView;
