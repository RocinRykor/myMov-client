export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img class="movie-poster" src={movie.image}/>
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.Name}</span>
      </div>
        <button onClick={onBackClick}>Back</button>
    </div>
  );
};

