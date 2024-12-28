import React from 'react';
import PropTypes from "prop-types";


export const UserInfo = ({ email, name }) => {
    return (
        <>
            <h4>My Profile</h4>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
        </>
    )
}

UserInfo.propTypes = {
    email: PropTypes.string,
    name: PropTypes.string,
  };