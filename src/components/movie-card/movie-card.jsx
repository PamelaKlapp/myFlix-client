import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
 
  render() {
    const { nombreProp } = this.props;

    return (
    <Card>
        <Card.Img variant="top" src={nombreProp.ImagePath} />
        <Card.Body>
          <Card.Title>{nombreProp.Title}</Card.Title>
          <Card.Text>{nombreProp.Description}</Card.Text>
          <Link to={`/movies/${nombreProp._id}`}>
          <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
    </Card>
    );
  }
}


MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    }).isRequired,
};

