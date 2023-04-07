import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <Spinner
      animation="grow"
      role="status"
      style={{ width: "100px", height: "100px" }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Loading;
