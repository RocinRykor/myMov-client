import {useParams} from "react-router";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";

export const MovieView = ({movies, user}) => {
    const storedToken = localStorage.getItem("token");
    const [token] = useState(storedToken ? storedToken : null);

    // Grab movies id from the URL parameters
    const {moviesID} = useParams();

    // Grab user information for their list of favorite movies
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const getUser = (token) => {
        fetch(`https://mymov-project.herokuapp.com/users/${user.Username}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        }).then(response => response.json())
            .then((response) => {
                console.log("Response: ", response)
                setFavoriteMovies(response.FavoriteMovies)
            })
    }

    useEffect(() => {
        getUser(token);
    }, [])


    const addToFavorites = (movieID) => {
        fetch(`https://mymov-project.herokuapp.com/users/${user.Username}/movies/${movieID}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }).then((response) => {
          if (response.ok) {
            alert("Movie Added To Favorites");
            window.location.reload();
          } else {
            alert("Something went wrong");
          }
        });
      };

    const removeFromFavorites = (movieID) => {
        fetch(`https://mymov-project.herokuapp.com/users/${user.Username}/movies/${movieID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }).then((response) => {
          if (response.ok) {
            alert("Movie Removed from Favorites");
            window.location.reload();
          } else {
            alert("Something went wrong");
          }
        });
      };

    // Find the matching movie in the list of movies
    const movie = movies.find((m) => m.id === moviesID);
    const isFavorite = favoriteMovies.find((f) => f.Title === movie.title)

    return (
        <div>
            <>
                {!isFavorite ? (
                    <Button onClick={() => addToFavorites(movie.id)}>Add to Favorites!</Button>
                ) : (
                    <Button onClick={() => removeFromFavorites(movie.id)}>Remove from Favorites!</Button>
                )}
            </>
            <img src={movie.image} alt="Movie Poster"/>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director.Name}</span>
            </div>
            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
        </div>
    );
};

