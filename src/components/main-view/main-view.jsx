
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view"; 
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

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

  // Displays movie-view when movie is selected (clicked)
  if (selectedMovie) {
    return (
      <>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear();
      }}
      > Logout 
      </button>
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      </>
    );
  }

  // Displays alternate message if the list of movies is empty
  if (movies.length === 0) {
    return (
      <div>
        <div>The list is empty!</div>
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear();
        }}
        > Logout
        </button>
    </div>
    );
  }

  // Displays List of movies for user to select as well as a logout button
  return (
      <div>
        {movies.map((movie) => (
            <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
            />
        ))}
        <br/>
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear();
        }}
        > Logout
        </button>
      </div>
  );
}