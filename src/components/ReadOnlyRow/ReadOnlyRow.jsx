import React from "react";

const ReadOnlyRow = ({ medication, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{medication.medicationName}</td>
      <td>{medication.dosage}</td>
      <td>{medication.timeOfMeds}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, medication)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(medication.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;