import {useState, useEffect} from "react";
import {FavoriteMoviesView} from "../favorite-movies-view/favorite-movies-view";
import {UpdateView} from "../update-view/update-view";
import {Container, Row, Col, Card, Button} from "react-bootstrap";

export const ProfileView = ({user}) => {

    const storedToken = localStorage.getItem("token");
    const [token] = useState(storedToken ? storedToken : null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState("");
    const [favoriteMovies, setFavoriteMovies] = useState([]);

// Show updated user on the profile
    const getUser = (token) => {
        fetch(`https://mymov-project.herokuapp.com/users/${user.Username}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        }).then(response => response.json())
            .then((response) => {
                console.log("getUser response", response)
                setUsername(response.Username);
                setEmail(response.Email);
                setPassword(response.Password);
                setBirthday(response.Birthday);
                setFavoriteMovies(response.FavoriteMovies)
            })
    }

    const deleteAccount = () => {

        fetch(`https://mymov-project.herokuapp.com/users/${user.Username}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }).then((response) => {
          if (response.ok) {
            alert("Account successfully deleted");
            localStorage.clear();
            window.location.reload();
          } else {
            alert("Something went wrong");
          }
        });
      };

    // Format the birthday value to a more readable format
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    const dateBirthday = new Date(birthday);
    const formattedBirthday = dateBirthday.toLocaleDateString("en-US", options);
    // TODO formatted birthday shows up 1 day off because of time-zone issues,

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
                <FavoriteMoviesView favMovies={favoriteMovies}/>
            </Row>
            <Row>
                <UpdateView user={user}/>
            </Row>
            <Row md={3}>
                <Card className='mt-3'>
                    <Card.Body>
                        <h4>Delete User Account</h4>
                        <text>This action is not reversible, proceed with caution</text>
                        <Row>
                            <Button onClick={() => deleteAccount(user.Username)} className="btn-danger mt-3">CLICK HERE TO DELETE YOUR ACCOUNT</Button>
                        </Row>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    )
};
