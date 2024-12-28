import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../redux/reducers/user";

export const LoginView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  
  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
        Username: username,
        Password: password
      };
  
      fetch("https://movie-api33-c32ceac54882.herokuapp.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Login response: ", data);
          if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            dispatch(setUser(data.user));
          } else {
            alert("No such user");
          }
        })
        .catch((e) => {
          alert("Something went wrong");
        });
     };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3" 
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};