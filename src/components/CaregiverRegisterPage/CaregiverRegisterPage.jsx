import React from 'react';
import CaregiverRegisterForm from '../CaregiverRegistration/CaregiverRegisterForm'
import { useHistory } from 'react-router-dom';

function CaregiverRegisterPage() {
  const history = useHistory();

  return (
    <div>
      <CaregiverRegisterForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/childsPage');
          }}
        >
          Login
        </button>
      </center>
    </div>
  );
}

export default CaregiverRegisterPage;
