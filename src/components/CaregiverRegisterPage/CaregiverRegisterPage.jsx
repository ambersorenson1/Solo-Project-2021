import React from 'react';

import { useHistory } from 'react-router-dom';
import CaregiverRegisterForm from '../CaregiverRegisterForm/CaregiverRegisterForm';

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
            history.push('/login');
          }}
        >
          Login
        </button>
      </center>
    </div>
  );
}

export default CaregiverRegisterPage;