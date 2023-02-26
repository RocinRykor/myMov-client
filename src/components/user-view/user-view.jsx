import { Button, Card, Col, Collapse, Row } from "react-bootstrap";
import { UpdateView } from "../update-view/update-view";
import { DeleteView } from "../delete-view/delete-view";
import { useState } from "react";

export const UserView = ({ user }) => {
  const [open, setOpen] = useState(false);

  // Format the birthday value to a more readable format
  const dateBirthday = new Date(user.Birthday);
  // Using the Intl.DateTimeFormat instead of toLocaleDateString to avoid issues with timezones causing birthdays to show up as the wrong day
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC", // Set the time zone to the one in which the date was saved
  });
  const formattedBirthday = formatter.format(dateBirthday);

  return (
    <Card border="light" className="bg-light bg-opacity-75">
      <Card.Body className="p-3 p-md-5">
        <Card.Title className="">
          <Row className="d-flex flex-column flex-lg-row ms-2 text-lg-center mt-lg-3 mt-3">
            <Col>Username: {user.Username}</Col>
            <Col>Email: {user.Email}</Col>
            <Col>Birthday: {formattedBirthday}</Col>
            <Col>
              <Button
                onClick={() => setOpen(!open)}
                aria-controls="collapse-form"
                aria-expanded={open}
                variant="secondary"
                className="text-white ms-4"
              >
                Edit Profile
              </Button>
            </Col>
          </Row>
        </Card.Title>
        <Collapse in={open}>
          <div id="collapse-form">
            <UpdateView user={user} />
          </div>
        </Collapse>
      </Card.Body>
      <Card.Footer>
        <DeleteView user={user} />
      </Card.Footer>
    </Card>
  );
};
