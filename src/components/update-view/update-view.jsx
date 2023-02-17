
import { useState } from "react";
import {Button, Form, Row, Col, Card, CardGroup} from "react-bootstrap";

export const UpdateView = ({ user }) => {

    const storedToken = localStorage.getItem("token");

    const [token] = useState(storedToken ? storedToken : null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState("");

    const handleSubmit = async(event) => {
        event.preventDefault();

        const data = {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
        };

    console.log(data)
        const updateUser = await fetch(`https://mymov-project.herokuapp.com/users/${user.Username}`, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"},
        })

        const response = await updateUser.json()
        console.log(response)
        if (response) {
          alert("Account successfully updated! Please log in again");
          localStorage.clear();
          window.location.reload();
        } else {
          alert("Something went wrong");
        }
      };

  return (
    <Row>
      <Col md={4}>
        <CardGroup>
          <Card>
            <Card.Body>
              <h2>Update user info</h2>
              <p>All Fields Required</p>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formUsername' className='mt-3'>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type='text'
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength='3'
                    placeholder='Enter your new username'
                    //value={user.Username}
                  />
                  <Form.Text>
                    Username must be at least 3 character's long
                  </Form.Text> </Form.Group>
                <Form.Group controlId='formPassword' className='mt-3'>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    pattern="^[A-Za-z0-9 .,'\-!?%&]+$"
                    placeholder='Choose a new password'
                  />
                  <Form.Text>
                    Password may only contain letters, numbers and special characters: .,'-!?%&
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId='formEmail' className='mt-3'>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder='Enter email'
                    //value={user.Email}
                  />
                  <Form.Text>
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId='formBirthday' className='mt-3'>
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type='date'
                    required
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Button variant='primary' type='submit' className='mt-3'>
                      Update User
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </CardGroup>
      </Col>
    </Row>
  );
};