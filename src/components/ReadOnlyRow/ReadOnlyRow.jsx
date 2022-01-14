import React from "react";
import { useSelector } from "react-redux";
import Button from '@mui/material/Button'
const ReadOnlyRow = ({ medication, handleEditClick, handleDeleteClick }) => {
const user = useSelector(store=>store.user);
  return (
    <tr>
      <td>{medication.medicationName}</td>
      <td>{medication.dosage}</td>
      <td>{medication.timeOfMeds}</td>
      {user.role == 1&& <td>
        <Button variant="contained" color="secondary"
          onClick={(event) => handleEditClick(event, medication)}
        >Edit</Button>
        <Button variant="outlined" color="error"  onClick={() => handleDeleteClick(medication)}>
          Delete
        </Button>
      </td>}
    </tr>
  );
};

export default ReadOnlyRow;