import {useParams} from "react-router";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import {AiFillHeart, AiOutlineHeart} from "react-icons/all";

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
                window.location.reload();
            } else {
                alert("Something went wrong");
            }
        });
    };

    // Find the matching movie in the list of movies
    const movie = movies.find((m) => m.id === moviesID);
    const isFavorite = favoriteMovies.find((f) => f._id === moviesID);

    return (
        <>
            <Row>
                <Col md={4}>
                    <Image src={movie.image}></Image>
                </Col>
                <Col md={8}>
                    <Card border="light" className="bg-light bg-opacity-75 shadow">
                        <Card.Body className="p-3 p-md-5">
                            <Card.Title className="mb-3 fw-bold fs-2">{movie.title}</Card.Title>
                            <Card.Text>
                                <span className="me-1 fw-bold">Description: </span>
                                <span>{movie.description}</span>
                            </Card.Text>
                            <Card.Text>
                                <span className="me-1 fw-bold">Genre: </span>
                                <span>{movie.genre.Name}</span>
                            </Card.Text>
                            <Card.Text>
                                <span className="me-1 fw-bold">Director: </span>
                                <span>{movie.director.Name}</span>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className={"d-flex flex-row justify-content-between align-items-baseline mt-auto"}>
                            <Link to={`/`}
                                  className={"text-start"}>
                                <Button className="btn-secondary">Back</Button>
                            </Link>
                            {isFavorite ? (
                                <Button variant={"btn-secondary"}>
                                    <AiFillHeart onClick={() => removeFromFavorites(movie.id)} color={"red"}
                                                 fontSize="2em"/>
                                </Button>
                            ) : (
                                <Button variant={"btn-secondary"}>
                                    <AiOutlineHeart onClick={() => addToFavorites(movie.id)} color={"gray"}
                                                    fontSize="2em"/>
                                </Button>
                            )}
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

