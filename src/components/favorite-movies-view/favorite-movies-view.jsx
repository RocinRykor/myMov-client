import React, from 'react';
import {Row, Col} from 'react-bootstrap';

export const FavoriteMoviesView = ({ movies, favMovies }) => {

  console.log("All Movies: ", movies)
  console.log("Fav Movies: ", favMovies)

  let favoriteMovies = movies.filter(m => favMovies.includes(m._id))
  console.log("Filtered Favorite Movies: ", favoriteMovies)

  return (
    <Row>
      {favMovies.length === 0 ? (
        <Col>The list of favorite movies is empty</Col>
      ) : (
        <>
          <div className='text-start h2 mb-4'>List of favorite movies</div>
          {favMovies.map((movie) => (
            <Col>
              {movie.title}
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};