import React, { useState } from "react";
import { Row } from "react-bootstrap";

const ImageUploadForm = ({ onImageUpload, movieId, token }) => {
  const [file, setFile] = useState(null);

  const handleImageChange = (e) => {
    e.preventDefault();
    if (e.target.files) {
      setFile(e.target.files[0]);
    }

    console.log("File: ", file);
  };

  const handleUpload = async () => {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
      document.getElementById("message").textContent =
        "Please select a file to upload.";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    console.log("Form Data", formData);

    try {
      const response = await fetch(
        `http://MyFlix-ALB-1894489294.us-east-1.elb.amazonaws.com/images/${movieId}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.status === 200) {
        alert("Image uploaded successfully!");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      document.getElementById("message").textContent = "Error uploading file.";
    }
  };

  return (
    <>
      <Row className="image-upload-form">
        <h3>Upload a New Image</h3>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button onClick={handleUpload}>Upload</button>
      </Row>
    </>
  );
};

export default ImageUploadForm;
