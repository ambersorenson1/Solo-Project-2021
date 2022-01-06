import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect} from "react-router-dom";

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const errors = useSelector((store) => store.errors);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();



    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        adminRef : "",
        role: role,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div> 
      <div>
        <label htmlFor="role">
          Role:
          <input
            type="number"
            name="role"
            min="1"
            max="2"
            value={role}
            required
            onChange={(event) => setRole(event.target.value)}
          />
        </label>
      </div> 
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
      {user.redirect && <Redirect to="/caregiver-registration"/>}
    </form>
  );
}

export default RegisterForm;
