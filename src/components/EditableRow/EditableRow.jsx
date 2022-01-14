import React from "react";
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import SaveIcon from '@material-ui/icons/Save'
import CancelPresentationOutlinedIcon from '@material-ui/icons/CancelPresentationOutlined';

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <Box
      height={800}
    >
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
        variant="outlined" color="error" onClick={handleCancelClick}>Cancel</Button>
      </td>
    </Box>
  );
};

export default EditableRow;