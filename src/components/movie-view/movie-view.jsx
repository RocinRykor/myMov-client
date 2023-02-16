import {useParams} from "react-router";
import {Link} from "react-router-dom";

export const MovieView = ({ movies }) => {
    // Grab movies id from the URL parameters
    const { moviesID } = useParams();

    // Find the matching movie in the list of movies
    const movie = movies.find((m) => m.id === moviesID);

    return (
        <div>
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

