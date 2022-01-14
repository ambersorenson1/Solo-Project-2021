import React from "react";
import Button from '@mui/material/Button'
import SaveIcon from '@material-ui/icons/Save'
import CancelPresentationOutlinedIcon from '@material-ui/icons/CancelPresentationOutlined';

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Medication Name..."
          name="medicationName"
          value={editFormData.medicationName}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Dosage..."
          name="dosage"
          value={editFormData.dosage}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Time Of Meds..."
          name="timeOfMeds"
          value={editFormData.timeOfMeds}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
      <Button 
              startIcon={<SaveIcon />}
              variant = "contained" 
              color="primary" 
              type="submit">
                Save
              </Button>
              <Button 
              startIcon={<CancelPresentationOutlinedIcon />}
              variant="contained" color="secondary" onClick={handleCancelClick}>Cancel</Button>
      </td>
    </tr>
  );
};

export default EditableRow;