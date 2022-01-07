import React, { useState,Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";

import data from "../../mock-data.json";
import ReadOnlyRow from "../ReadOnlyRow/ReadOnlyRow";
import EditableRow from "../EditableRow/EditableRow";
import { useEffect } from "react";
import { actionChannel } from "redux-saga/effects";

const ChildsPage = () => {
  const medication = useSelector((store) => store.medication);
  const user = useSelector(store=>store.user);
  useEffect(() => {
    dispatch({
      type:'FETCH_MED',
    })
  }, []);
  const [medications, setMedications] = useState(medication);
  const dispatch = useDispatch();
  const [addFormData, setAddFormData] = useState({
    medicationName: "",
    dosage: "",
    timeOfMeds: "",
  });

  const [editFormData, setEditFormData] = useState({
    medicationName: "",
    dosage: "",
    timeOfMeds: "",
  });
  const [saveFormData, setSaveFormData] = useState({
    medicationName: "",
    dosage: "",
    timeOfMeds: "",
  });

  const [editMedicationId, setEditMedicationId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();
    // dispatch({
    //   type: 'EDIT_MED',
    //   id: 7,
    //   payload: 'h
    // })

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newMedication = {
      id: nanoid(),
      medicationName: addFormData.medicationName,
      dosage: addFormData.dosage,
      timeOfMeds: addFormData.timeOfMeds,
    };

    dispatch({
      type:"ADD_MED",
      payload:{
        medicationName: addFormData.medicationName,
        dosage: addFormData.dosage,
        timeOfMeds: addFormData.timeOfMeds,
     }
    })

    const newMedications = [...medications, newMedication];
    setMedications(newMedications);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedMedication = {
      id: editMedicationId,
      medicationName: editFormData.medicationName,
      dosage: editFormData.dosage,
      timeOfMeds: editFormData.timeOfMeds,
    };
    console.log('medsID', editedMedication);
    dispatch({
      type:'EDIT_MED',
      payload: editedMedication
    })
    const newMedications = [...medications];

    const index = medications.findIndex((medication) => medication.meds_id === editMedicationId);

    newMedications[index] = editedMedication;

    setMedications(newMedications);
    setEditMedicationId(null);
  };


  const handleEditClick = (event, medication) => {
    event.preventDefault();
    setEditMedicationId(medication.meds_id);
    
    const formValues = {
      id:medication.meds_id,
      medicationName: editFormData.medicationName,
      dosage: editFormData.dosage,
      timeOfMeds: editFormData.timeOfMeds,
    };
    setEditFormData(formValues);
  };


  const handleCancelClick = () => {
    setEditMedicationId(null);
  };

  const handleDeleteClick = (medication) => {
    let payload = {id: medication.meds_id}
   dispatch({
     type: 'DELETE_MED',
     payload
   })
  };
  const renderForm = ()=>{
    if (user.role==1){
      return(
        <div>

        <h2>Add a Medication</h2>
        <form onSubmit={handleAddFormSubmit}>
          <input
            type="text"
            name="medicationName"
            required="required"
            placeholder="Enter a medication name..."
            onChange={handleAddFormChange}
            />
          <input
            type="text"
            name="dosage"
            required="required"
            placeholder="Enter the dosage amount..."
            onChange={handleAddFormChange}
            />
          <input
            type="text"
            name="timeOfMeds"
            required="required"
            placeholder="Enter time of medication..."
            onChange={handleAddFormChange}
            />
          <button type="submit">Add</button>
        </form>
        </div>
      )
    }
  }

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Medication Name</th>
              <th>Dosage</th>
              <th>Time of Meds</th>
              
            {user.role == 1&&<th>Actions</th>}
            </tr> 
          </thead>
          <tbody>
            {medication?.map((medication) => (
              <Fragment>
                {editMedicationId === medication.meds_id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    medication={medication}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

    {renderForm()}
    </div>
  );
};

export default ChildsPage;