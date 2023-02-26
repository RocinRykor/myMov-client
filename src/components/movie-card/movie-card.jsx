import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/all";

export const MovieCard = ({ movie, user }) => {
  const storedToken = localStorage.getItem("token");
  const [token] = useState(storedToken || null);

  // Grab user information for their list of favorite movies
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const getUser = (token) => {
    fetch(`https://mymov-project.herokuapp.com/users/${user.Username}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((response) => {
        setFavoriteMovies(response.FavoriteMovies);
      });
  };

  useEffect(() => {
    getUser(token);
  }, []);

  const addToFavorites = (movieID) => {
    fetch(
      `https://mymov-project.herokuapp.com/users/${user.Username}/movies/${movieID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) {
        window.location.reload();
      } else {
        alert("Something went wrong");
      }
    });
  };

  const removeFromFavorites = (movieID) => {
    fetch(
      `https://mymov-project.herokuapp.com/users/${user.Username}/movies/${movieID}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) {
        window.location.reload();
      } else {
        alert("Something went wrong");
      }
    });
  };

  // Find the matching movie in the list of movies
  const isFavorite = favoriteMovies.find((f) => f.Title === movie.title);

  return (
    <Card border="light" className="h-100 bg-light bg-opacity-75 shadow">
      <Card.Img className="mb-3" variant="top" src={movie.image} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text className="text-muted">By: {movie.director.Name}</Card.Text>
        <Card.Text className="mt-3">{movie.description}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex flex-row justify-content-between align-items-baseline mt-auto">
        <Link
          to={`/movies/${encodeURIComponent(movie.id)}`}
          className="text-start"
        >
          <Button className="btn-secondary">Details</Button>
        </Link>
        {isFavorite ? (
          <Button variant="btn-secondary">
            <AiFillHeart
              onClick={() => removeFromFavorites(movie.id)}
              color="red"
              fontSize="2em"
            />
          </Button>
        ) : (
          <Button variant="btn-secondary">
            <AiOutlineHeart
              onClick={() => addToFavorites(movie.id)}
              color="gray"
              fontSize="2em"
            />
          </Button>
        )}
      </Card.Footer>
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
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birthyear: PropTypes.string,
    }),
  }).isRequired,
};
