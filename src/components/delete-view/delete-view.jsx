import { Button, Col } from "react-bootstrap";

export const DeleteView = ({ token, user }) => {
  const deleteAccount = () => {
    const userWarning = confirm(
      `Are you sure? This action is permanent, if you delete your account it cannot be removed. Proceed?`
    );

    userWarning === false
      ? alert("Thank you for continuing to use myMov")
      : fetch(`http://10.0.12.222/users/${user.Username}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
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

  return (
    <Col md={3} className="float-end">
      <div>
        <Button
          onClick={() => deleteAccount(user)}
          className="button-delete"
          variant="danger"
        >
          Click here to delete your account
        </Button>
      </div>
    </Col>
  );
};
