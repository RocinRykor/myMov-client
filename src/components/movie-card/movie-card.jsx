import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";

import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
      <Card className="h-100">
          <Card.Img variant="top" src={movie.image} />
          <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.director.Name}</Card.Text>
              <Button onClick={() => onMovieClick(movie)} variant="link">
                  Open
              </Button>
          </Card.Body>
      </Card>
  );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string,
        Description: PropTypes.string,
        ImageURL: PropTypes.string,
        Genre: PropTypes.shape({
            Name: PropTypes.string,
            Description: PropTypes.string
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string,
            Bio: PropTypes.string,
            Birthyear: PropTypes.string
        })
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};