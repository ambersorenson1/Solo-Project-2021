import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [caregiver, setCaregiver] = useState('');
  const [caregiverPassword, setCaregiverPassword] = useState('');
  const [caregiverrole, setCaregiverrole] = useState ('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
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
            min="1" 
            max="2"
            name="role"
            value={role}
            required
            onChange={(event) => setRole(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="caregiver-username">
          Caregiver-Username:
          <input
            type="text"
            name="caregiver-username"
            value={caregiver}
            required
            onChange={(event) => setCaregiver(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="caregiverPassword">
          Password:
          <input
            type="caregiverPassword"
            name="caregiverPassword"
            value={caregiverPassword}
            required
            onChange={(event) => setCaregiverPassword(event.target.value)}
          />
        </label>
      </div>  
      <div>
        <label htmlFor="caregiverrole">
          Role:
          Parent/Guardian = 1 Caregiver = 2
          <input
            type="number"
            min="1" 
            max="2"
            name="caregiverrole"
            value={caregiverrole}
            required
            onChange={(event) => setCaregiverrole(event.target.value)}
            
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
