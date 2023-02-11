import {useEffect, useState} from "react";
import { MovieCard } from "../movie-card/movie-card"
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import {SignupView} from "../signup-view/signup-view";

export const MainView = () => {
  	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [user, setUser] = useState(null)
	const [token, setToken] = useState(null);
	const storedUser = JSON.parse(localStorage.getItem("user"));
	const storedToken = JSON.parse(localStorage.getItem("token"));

	useEffect(() => {
		if (!token) return;

		fetch("https://mymov-project.herokuapp.com/movies", {
			headers: { Authorization: 'Bearer ${token}' }
		})
			.then((response) => response.json())
			.then((data) => {
			  const moviesFromApi = data.map((movie) => { return {
				  id: movie._id,
				  title: movie.Title,
				  description: movie.Description,
				  image: movie.ImageURL,
				  genre: movie.genre,
				  director: movie.Director,
			  }
			  });
			  setMovies(moviesFromApi);
			});
	  }, [token])

	  if (!user) {
    return (
		<>
			<LoginView onLoggedIn={(user, token) => {
				setUser(user);
				setToken(token);
			}} />
			or
			<SignupView />
		</>
    );
  }

	if (selectedMovie) {
		return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
	}

	if (movies.length === 0) {
		return (
			<div>
				<button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
				<div>The list is empty!</div>
			</div>

		);
	}

	return (
		<div>
			{movies.map((movie) => (
				<MovieCard
					key={movie.id}
					movie={movie}
					onMovieClick={(newSelectedMovie) => {
						setSelectedMovie(newSelectedMovie);
					}}
				/>
			))}
			<button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
		</div>
	);
};

