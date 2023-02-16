import React, from 'react';
import {Row, Col} from 'react-bootstrap';
import {MovieCard} from "../movie-card/movie-card";

export const FavoriteMoviesView = ({favMovies}) => {

    const favoriteMovies = favMovies.map((movie) => {
        return {
            id: movie._id,
            title: movie.Title,
            image: movie.ImageURL,
            description: movie.Description,
            genre: movie.Genre,
            director: movie.Director,
        }
    });

    return (
        <Row>
            {favoriteMovies.length === 0 ? (
                <Col>The list of favorite movies is empty</Col>
            ) : (
                <>
                    <div className='text-start h2 mb-4'>List of favorite movies</div>
                    {favoriteMovies.map((movie) => (
                        <Col className="mb-4" key={movie.id} md={3}>
                            <MovieCard movie={movie}/>
                        </Col>
                    ))}
                </>
            )}
        </Row>
    );
};