import {useParams} from "react-router";
import {Link} from "react-router-dom";

export const MovieView = ({ movies }) => {
    const { movieID } = useParams();

    const movie = movies.find((m) => m._id === movieID);

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

