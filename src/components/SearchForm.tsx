import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

type ISearchFrom = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  fetchRepositories: () => Promise<void>;
  reset: () => void;
};

const SearchForm = ({
  username,
  setUsername,
  setPage,
  fetchRepositories,
  reset,
}: ISearchFrom) => {
  const [validated, setValidated] = useState(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setValidated(false);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(0);
    reset();

    const form = event.currentTarget;
    if (form.checkValidity()) {
      await fetchRepositories();
    } else {
      setValidated(true);
    }
  };
  console.log(validated);

  return (
    <Row className="justify-content-md-center">
      <Col>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Form.Floating className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search"
              value={username}
              onChange={handleInputChange}
              id="username"
              required
            />
            <label htmlFor="username">Username or Organization</label>
            <Form.Control.Feedback type="invalid">
              Please provide a valid username
            </Form.Control.Feedback>
          </Form.Floating>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default SearchForm;
