import {useState, useEffect} from "react";
import {FavoriteMoviesView} from "../favorite-movies-view/favorite-movies-view";
import {Container, Row, Col, Card, Button} from "react-bootstrap";

export const ProfileView = ({user, movies}) => {

    const storedToken = localStorage.getItem("token");
    const storedMovies = JSON.parse(localStorage.getItem("movies"))
    const storedUser = localStorage.getItem("user");


    const [token] = useState(storedToken ? storedToken : null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState("");
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const [allMovies] = useState(storedMovies ? storedMovies : movies);
    const [filteredMovies, setFilteredMovies] = useState([]);


// Show updated user on the profile
    const getUser = (token) => {
        fetch(`https://mymov-project.herokuapp.com/users/${user.Username}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        }).then(response => response.json())
            .then((response) => {
                // console.log("getUser response", response)
                setUsername(response.Username);
                setEmail(response.Email);
                setPassword(response.Password);
                setBirthday(response.Birthday);
                setFavoriteMovies(response.FavoriteMovies)
            })
    }

    // Format the birthday value to a more readable format
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    const dateBirthday = new Date(birthday);
    const formattedBirthday = dateBirthday.toLocaleDateString("en-US", options);

    useEffect(() => {
        getUser(token);
    }, [])

    return (
        <Container>
            <Row className="mb-4">
                <Card>
                    <Card.Body>
                        <div>
                            <h4>User Details</h4>
                            <p>Username: {username}</p>
                            <p>Birthday: {formattedBirthday}</p>
                            <p>Email: {email}</p>
                        </div>
                    </Card.Body>
                </Card>
            </Row>
            <Row>
                <FavoriteMoviesView movies={movies} favMovies={favoriteMovies}/>
            </Row>
            <Row>
                <Card>
                    <Card.Body>
                        <div>
                            <h4>Update User Information:</h4>
                            <Row>
                                <Button className="btn-danger">DELETE USER!</Button>
                            </Row>
                        </div>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    )
};
