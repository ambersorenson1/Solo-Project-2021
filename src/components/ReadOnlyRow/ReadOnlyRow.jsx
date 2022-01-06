import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ReadOnlyRow = ({ medication, handleEditClick, handleDeleteClick }) => {
const user = useSelector(store=>store.user);
  return (
    <tr>
      <td>{medication.medicationName}</td>
      <td>{medication.dosage}</td>
      <td>{medication.timeOfMeds}</td>
      {user.role == 2&& <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, medication)}
        >
          Edit

        </button>
        <button type="button" onClick={() => handleDeleteClick(medication.id)}>
          Delete
        </button>
      </td>}
    </tr>
  );
};

export default ReadOnlyRow;