import React from "react";
import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
    render() {
        const {movie} = this.props;

    return (
      <Card style={{ marginTop: "5%" }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Link to={`/movies/${movie._id}`}>
          <Button onClick={() => onMovieClick(movie)} variant="link">
            Open
          </Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
    };

export default DirectorView