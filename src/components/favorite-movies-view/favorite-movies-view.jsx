import React, from 'react';
import {Row, Col, Card} from 'react-bootstrap';
import {MovieCard} from '../movie-card/movie-card';

export const FavoriteMoviesView = ({favMovies, user}) => {

  const favoriteMovies = favMovies.map((movie) => {
    return {
      id: movie._id,
      title: movie.Title,
      image: movie.ImageURL,
      description: movie.Description,
      genre: movie.Genre,
      director: movie.Director,
    };
  });

  if (favoriteMovies.length === 0) {
    return <Col>The list of favorite movies is empty</Col>;
  }

  return (
      <Card border="light" className="bg-light bg-opacity-75 mt-3">
        <Card.Title className="fw-bold fs-2">Favorite Movies:</Card.Title>
        <Card.Body>
          <Row>
            {favoriteMovies.map((movie) => (
                <Col className="mb-4" key={movie.id} md={3}>
                  <MovieCard movie={movie} user={user}/>
                </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
  );
};