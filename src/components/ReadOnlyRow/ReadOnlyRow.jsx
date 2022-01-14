import React from "react";
import { useSelector } from "react-redux";
import Button from '@mui/material/Button'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';




const ReadOnlyRow = ({ medication, handleEditClick, handleDeleteClick }) => {
const user = useSelector(store=>store.user);
  return (
    <tr>
      <td>{medication.medicationName}</td>
      <td>{medication.dosage}</td>
      <td>{medication.timeOfMeds}</td>
      {user.role == 1&& <td>
        <Button 
        startIcon = {<EditOutlinedIcon />}
        variant="contained" 
        color="primary"
          onClick={(event) => handleEditClick(event, medication)}
        >Edit</Button>
        <Button 
        startIcon ={<DeleteOutlinedIcon />}
        variant="contained" 
        color="secondary"  
        onClick={() => handleDeleteClick(medication)}>
        Delete
        </Button>
      </td>}
    </tr>
  );
};

export default ReadOnlyRow;