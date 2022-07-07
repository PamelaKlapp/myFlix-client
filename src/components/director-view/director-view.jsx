import React from "react";
import React from "react";
import { Button, Card } from "react-bootstrap";

export class DirectorView extends React.Component {
    render() {
        const { director} = this.props;

    return (
      <Card style={{ marginTop: "5%" }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{director.name}</Card.Title>
          <Card.Text>{director.description}</Card.Text>
          <Button onClick={goBack}>Back</Button>
        </Card.Body>
      </Card>
    );
  }
    };

export default DirectorView
