import {useState, useEffect} from 'react';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {LoginView} from '../login-view/login-view';
import {SignupView} from '../signup-view/signup-view';
import {ProfileView} from '../profile-view/profile-view';
import {NavigationBar} from '../navigation-bar/navigation-bar';
import {Col, Form, Row} from 'react-bootstrap';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch('https://mymov-project.herokuapp.com/movies', {
      headers: {Authorization: `Bearer ${token}`},
    }).then((response) => response.json()).then((data) => {
      const moviesFromApi = data.map((movie) => {
        return {
          id: movie._id,
          title: movie.Title,
          image: movie.ImageURL,
          description: movie.Description,
          genre: movie.Genre,
          director: movie.Director,
        };
      });
      setMovies(moviesFromApi);
    });
  }, [token]);

  // Filter the list of movies by what was typed in the search bar
  //Check by Title, Director, and Genre
  useEffect(() => {
    if (searchString && searchString.length > 0) {
      const searchedMoviesData = movies.filter(m => (
          m.title.toLowerCase().includes(searchString.toLowerCase().trim()) ||
          m.genre.Name.toLowerCase().
              includes(searchString.toLowerCase().trim()) ||
          m.director.Name.toLowerCase().
              includes(searchString.toLowerCase().trim())
      ));
      setFilteredMovies(searchedMoviesData);
    } else {
      setFilteredMovies([]);
    }
  }, [searchString]);

  return (
      <BrowserRouter>
        <NavigationBar
            user={user}
            onLoggedOut={() => {
              setUser(null);
            }}
        />
        <Row className="justify-content-md-center">
          <Routes>
            <Route
                path="/signup"
                element={
                  <>
                    {user ? (
                        <Navigate to="/"/>
                    ) : (
                        <Col md={5}>
                          <SignupView/>
                        </Col>
                    )}
                  </>
                }
            />
            <Route
                path="/login"
                element={
                  <>
                    {user ? (
                        <Navigate to="/"/>
                    ) : (
                        <Col md={5}>
                          <LoginView onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                          }}
                          />
                        </Col>
                    )}
                  </>
                }
            />
            <Route
                path="/movies/:moviesID"
                element={
                  <>
                    {!user ? (
                        <Navigate to="/login" replace/>
                    ) : movies.length === 0 ? (
                        <Col> The List is Empty!</Col>
                    ) : (
                        <Col md={8}>
                          <MovieView movies={movies} user={user}/>
                        </Col>
                    )}
                  </>
                }
            />
            <Route
                path="/profile/"
                element={
                  <>
                    {!user ? (
                        <Navigate to="/login" replace/>
                    ) : (
                        <Col>
                          <ProfileView user={user}/>
                        </Col>
                    )}
                  </>
                }
            />
            <Route
                path="/"
                element={
                  <>
                    <Row className="search-bar justify-content-end m-0 mt-3">
                      <Col md={3} className="mb-3">
                        <Form>
                          <Form.Control
                              type="text"
                              placeholder="Search by Title, Genre, or Director"
                              value={searchString}
                              onChange={e => setSearchString(e.target.value)}
                              className="bg-light shadow-sm"
                          />
                        </Form>

                      </Col>
                    </Row>
                    {!user ? (
                        <Navigate to="/login" replace/>
                    ) : movies.length === 0 ? (
                        <Col>The List is Empty!</Col>
                    ) : (
                        <>
                          {filteredMovies && filteredMovies.length > 0 ? (
                              filteredMovies.map((movie) =>
                                  <Col className="mb-4" key={movie.id} md={3}>
                                    <MovieCard movie={movie} user={user}/>
                                  </Col>,
                              )
                          ) : (
                              movies.map((movie) => (
                                  <Col className="mb-4" key={movie.id} md={3}>
                                    <MovieCard movie={movie} user={user}/>
                                  </Col>
                              ))
                          )}
                        </>
                    )}
                  </>
                }
            />
          </Routes>
        </Row>
      </BrowserRouter>
  );
};