import React from "react";
import PropTypes from "prop-types"
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const UpdateUser =({ formData, handleSubmit, handleUpdate, handleDeleteAccount }) =>  {
    return (
        <>
            <h4>Update</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                    type="text"
                    value={formData.Username}
                    onChange={(e) => handleUpdate(e)}
                    required
                    minLength="3" 
                    placeholder="Enter a username"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                    type="password"
                    value={formData.Password}
                    onChange={(e) => handleUpdate(e)}
                    required
                    placeholder="Your password must be 8 or more characters"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                    type="email"
                    value={formData.Email}
                    onChange={(e) => handleUpdate(e)}
                    required
                    placeholder="Enter your email address"
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                    type="date"
                    value={formData.Birthday}
                    onChange={(e) => handleUpdate(e)}
                    required
                    placeholder="Enter your birthday"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit Changes
                </Button>

                <Button 
                    onClick={() => handleDeleteAccount()}
                    variant="outline-secondary"
                    className="mx-3"
                    >
                    Delete Account
                </Button>
            </Form>
        </>           
    )
}

UpdateUser.propTypes = {
    formData: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleDeleteAccount: PropTypes.func
  };