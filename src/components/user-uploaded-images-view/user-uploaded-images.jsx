import React from "react";
import { Row } from "react-bootstrap";

const UserUploadedImages = ({ userImages }) => {
  console.log();

  return (
    <>
      <Row>
        <h2>User Uploaded Images</h2>
      </Row>

      {/* Image Upload Form */}
      {userImages &&
        userImages.length > 0 &&
        userImages.map((image, index) => (
          <img
            key={index}
            src={`https://myflix-images.s3.amazonaws.com/${image.Key}`}
            alt={`Image ${index}`}
            style={{
              width: "300px",
              height: "300px",
            }} // Set the desired width and height here
          />
        ))}
    </>
  );
};

export default UserUploadedImages;
