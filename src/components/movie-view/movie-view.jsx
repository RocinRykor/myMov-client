import { useParams } from "react-router";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import UserUploadedImages from "../user-uploaded-images-view/user-uploaded-images";
import ImageUploadForm from "../image-upload-form/image-upload-form";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ movies, user }) => {
  const storedToken = localStorage.getItem("token");
  const [token] = useState(storedToken ? storedToken : null);

  // Grab movies id from the URL parameters
  const { moviesID } = useParams();

  // Grab user information for their list of favorite movies
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [userImages, setUserImages] = useState([]);
  const getUser = (token) => {
    fetch(
      `http://myflix-alb-522491147.us-east-1.elb.amazonaws.com/users/${user.Username}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("Response: ", response);
        setFavoriteMovies(response.FavoriteMovies);
      });
  };

  // Sample list of common image file extensions
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".svg",
    ".webp",
  ];

  // Function to filter out non-image objects
  function filterNonImages(userImages) {
    if (!userImages) {
      return []; // Return an empty array if userImages is undefined or null
    }

    return userImages.filter((object) => {
      const key = object.Key.toLowerCase(); // Convert to lowercase for case-insensitive comparison
      // Check if the object's key ends with any of the image extensions
      return imageExtensions.some((extension) => key.includes(extension));
    });
  }

  const getImages = (movieID) => {
    fetch(
      `http://myflix-alb-522491147.us-east-1.elb.amazonaws.com/images/${movieID}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("Response: ", response);
        setUserImages(filterNonImages(response.Contents));

        console.log(userImages);
      });
  };

  useEffect(() => {
    getUser(token);
    getImages(moviesID);
  }, []);

  const addToFavorites = (movieID) => {
    fetch(
      `http://myflix-alb-522491147.us-east-1.elb.amazonaws.com/users/${user.Username}/movies/${movieID}`,
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
      `http://myflix-alb-522491147.us-east-1.elb.amazonaws.com/users/${user.Username}/movies/${movieID}`,
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
  const movie = movies.find((m) => m.id === moviesID);
  const isFavorite = favoriteMovies.find((f) => f._id === moviesID);

  const similarMovies = movies.filter(
    (m) => m.genre.Name === movie.genre.Name && m !== movie
  );

  return (
    <>
      <Row>
        <Col md={4}>
          <Image src={movie.image}></Image>
        </Col>
        <Col md={8}>
          <Card border="light" className="bg-light bg-opacity-75 shadow">
            <Card.Body className="p-3 p-md-5">
              <Card.Title className="mb-3 fw-bold fs-2">
                {movie.title}
              </Card.Title>
              <Card.Text>
                <span className="me-1 fw-bold">Description: </span>
                <span>{movie.description}</span>
              </Card.Text>
              <Card.Text>
                <span className="me-1 fw-bold">Genre: </span>
                <span>{movie.genre.Name}</span>
              </Card.Text>
              <Card.Text>
                <span className="me-1 fw-bold">Director: </span>
                <span>{movie.director.Name}</span>
              </Card.Text>
            </Card.Body>
            <Card.Footer
              className={
                "d-flex flex-row justify-content-between align-items-baseline mt-auto"
              }
            >
              <Link to={`/`} className={"text-start"}>
                <Button className="btn-secondary">Back</Button>
              </Link>
              {isFavorite ? (
                <Button variant={"btn-secondary"}>
                  <AiFillHeart
                    onClick={() => removeFromFavorites(movie.id)}
                    color={"red"}
                    fontSize="2em"
                  />
                </Button>
              ) : (
                <Button variant={"btn-secondary"}>
                  <AiOutlineHeart
                    onClick={() => addToFavorites(movie.id)}
                    color={"gray"}
                    fontSize="2em"
                  />
                </Button>
              )}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      <Row>
        <UserUploadedImages userImages={userImages}></UserUploadedImages>
        <ImageUploadForm movieId={moviesID} token={token}></ImageUploadForm>
      </Row>

      <Row>
        <Row>
          <h2 className={"mt-3"}>Similar Movies: </h2>
          {similarMovies.map((movie) => (
            <Col className="mb-4" key={movie.id} md={4}>
              <MovieCard movie={movie} user={user} />
            </Col>
          ))}
        </Row>
      </Row>
    </>
  );
};
