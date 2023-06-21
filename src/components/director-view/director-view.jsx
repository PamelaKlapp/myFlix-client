import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export class DirectorView extends React.Component {
    render() {
        const { director, onBackClick} = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={movieObject.ImagePath} />
        <Card.Body>
          <Card.Title>Director:{director.name}</Card.Title>
          <Card.Text>Bio:{director.bio}</Card.Text>
          <Button onClick={() => {onBackClick(null);}}>Back</Button>
        </Card.Body>
      </Card>
    );
    }
};

DirectorView.propTypes = {
  movie: PropTypes.shape({
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired
};