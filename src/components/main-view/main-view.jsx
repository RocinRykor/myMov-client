
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view"; 
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import {Button, Col, Row} from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://mymov-project.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
          id: movie._id,
          title: movie.Title,
          image: movie.ImageURL,
          description: movie.Description,
          genre: movie.Genre,
          director: movie.Director,
          }
        });
        setMovies(moviesFromApi);
      })
  }, [token])

  // If the user is not logged in, present with login form and signup form
  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
		  <br/><br/>
        or
		  <br/><br/>
        <SignupView />
      </>
    )
  }

  return (
      <Row className="justify-content-md-center">
        {!user ? (
          <Col md={5}>
            <LoginView onLoggedIn={(user) => setUser(user)} />
            or
            <SignupView />
          </Col>
        ) : selectedMovie ? (
            <Col md={8}>
                <MovieView
                    movie={selectedMovie}
                    onBackClick={() => setSelectedMovie(null)}
                />
            </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <>
            {movies.map((movie) => (
                <Col className="mb-5" key={movie._id} md={3}>
                    <MovieCard
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                        }}
                    />
                </Col>
            ))}
              <Button onClick={() => { setUser(null); setToken(null); localStorage.clear();
        }}
        > Logout
        </Button>
          </>
        )}
      </Row>
  );
}