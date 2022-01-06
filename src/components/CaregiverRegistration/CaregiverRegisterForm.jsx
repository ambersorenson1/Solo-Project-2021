import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CaregiverRegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [adminRef, setAdminRef] = useState('');
  const [role, setRole] = useState('');
  const errors = useSelector((store) => store.errors);
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

  
  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
  <div>
        <label htmlFor="caregiver-username">
          C-Username:
          <input
            type="text"
            name="caregiver-username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="caregiverPassword">
          Password:
          <input
            type="caregiverPassword"
            name="caregiverPassword"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>  
      <div>
        <label htmlFor="adminRef">
          Password:
          <input
            type="adminRef"
            name="adminRef"
            value={adminRef}
            required
            onChange={(event) => setAdminRef(event.target.value)}
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
    </form>
  );
}

    export default CaregiverRegisterForm;