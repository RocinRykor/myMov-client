import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card"
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  	const [movies, setMovies] = useState([
		{ id: 1, title: "300", image: "https://www.themoviedb.org/t/p/original/9W49fy5G7v9Ed3CXtvMi41YqZtt.jpg", director: "Zack Snyder"},
		{ id: 2, title: "Iron Man", image: "https://www.themoviedb.org/t/p/original/egEkFOCl87aHJLkIGXGxzNdpQV3.jpg", director: "Jon Favreau"},
		{ id: 3, title: "The Matrix", image: "https://www.themoviedb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", director: "Wachowski Sisters"},
]);

const [selectedMovie, setSelectedMovie] = useState(null);

if (selectedMovie) {
	return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
}

if (movies.length === 0) {
	return <div>The list is empty!</div>
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
	</div>
);
};

