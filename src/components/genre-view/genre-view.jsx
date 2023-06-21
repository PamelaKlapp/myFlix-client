import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export class GenreView extends React.Component {
    render() {
        const { genre, onBackClick} = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={movieObject.ImagePath} />
        <Card.Body>
          <Card.Title>Genre:{genre.name}</Card.Title>
          <Card.Text>Description:{genre.description}</Card.Text>
          <Button onClick={() => {onBackClick(null);}}>Back</Button>
        </Card.Body>
      </Card>
    );
    }
};

  
GenreView.propTypes = {
  movie: PropTypes.shape({
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired
  })
};