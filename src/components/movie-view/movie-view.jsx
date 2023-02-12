import {Button} from "react-bootstrap";
export const MovieView = ({ movie, onBackClick }) => {
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
        <Button onClick={onBackClick}>Back</Button>
    </div>
);
};

