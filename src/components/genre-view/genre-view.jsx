import React from "react";
import { Button, Card } from "react-bootstrap";

export class GenreView extends React.Component {
    render() {
        const { genre} = this.props;

    return (
      <Card style={{ marginTop: "5%" }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{genre.name}</Card.Title>
          <Card.Text>{genre.description}</Card.Text>
          <Button onClick={goBack}>Back</Button>
        </Card.Body>
      </Card>
    );
  }
    };

export default GenreView