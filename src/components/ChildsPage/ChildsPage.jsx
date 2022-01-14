import React, { useState,Fragment, Children } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from '@material-ui/core/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import ReadOnlyRow from "../ReadOnlyRow/ReadOnlyRow";
import EditableRow from "../EditableRow/EditableRow";
import { useEffect } from "react";

const ChildsPage = ()=>{
  const medication = useSelector((store) => store.medication);
  const child = useSelector((store) => store.child);
  const [change, setChange] = useState(false);
  const user = useSelector(store=>store.user);
  const [currentSymptoms,setSymptoms] = useState("");
  const [value, setValue] = React.useState(new Date('2022-01-13T00:00:00.000Z'));
  const [childsName,setChildName] = useState("");
  const [diagnosis,setDiagnosis] = useState("");
  useEffect(() => {
    dispatch({
      type:'FETCH_MED',
    })
    dispatch({
      type:'FETCH_KID',
    })
   
  }, [change]);
  useEffect(()=>{
    if(child.child.length){
      setChildName(child.child[0].childsName)
      setDiagnosis(child.child[0].diagnosis)
      setSymptoms(child.child[0].currentSymptoms)
    }
  },[child])
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

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    dispatch({
      type:"ADD_MED",
      payload:{
        medicationName: addFormData.medicationName,
        dosage: addFormData.dosage,
        timeOfMeds: addFormData.timeOfMeds,
     }
    })
  }
    

    const handleAddChildInfoSubmit = (event) => {
      event.preventDefault();
        dispatch({
          type:'ADD_CHILD',
          payload:{
          childsName,
          diagnosis,
          currentSymptoms,  
         }
        })
    
        setChange(prev=>!prev);
  };
    const handleUpdateChildInfoSubmit = (event) => {
      event.preventDefault();
     
        dispatch({
          type:'UPDATE_KID',
          payload:{
          childsName,
          diagnosis,
          currentSymptoms,  
          id:child.child[0].id
         }
        })
    setChange(prev=>!prev)
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
    if(
      child.loading
    ){
      return "loading"
    }
    if (user.role==1 && !child.child.length){
      
      return(
        <><div>
            <h2>Add Child's Information</h2>
            <form onSubmit={(e)=>handleAddChildInfoSubmit(e,true)}>
            <input
              
              type="text"
              name="ChildsName"
              required="required"
              placeholder="Enter child's name..."
              value={childsName}
              onChange={(e)=>setChildName(e.target.value)} />
            <input
              type="text"
              name="Diagnosis"
              value={diagnosis}
              required="required"
              placeholder="Enter child's diagnosis..."
              onChange={(e)=>setDiagnosis(e.target.value)} />
            <input
              type="text"
              name="currentSymptoms"
              required="required"
              value={currentSymptoms}
              placeholder="Enter any current symptoms..."
              onChange={(e)=>setSymptoms(e.target.value)} />
            <button type="submit">Add</button>
          </form>
        </div>
        <div>
        </div></>
      )
    }else if(user.role==1 && child.child.length){
  console.log('child',child.child[0].childsName)
    return(

      <><div>
      <Typography textAlign={"center"} variant="h4"> Update Child's Information </Typography>
      <br></br>
      <form onSubmit={handleUpdateChildInfoSubmit}>
        <Grid container spacing={1}>        
          <Grid item xs={3}>
            <TextField
                defaultValue={child.child[0].childsName}
                required
                fullWidth
                color="secondary"
                variant="outlined"
                type='text'
                label='Enter Child Name' 
                value={childsName} 
                onChange={(e)=>setChildName(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
                defaultValue={child.child[0].diagnosis}
                required
                fullWidth
                multiline
                color="secondary"
                variant="outlined"
                type='text'
                label='=Enter Child Diagnosis ' 
                value={diagnosis} 
                onChange={(e)=>setDiagnosis(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
                defaultValue={child.child[0].currentSymptoms}
                required
                fullWidth
                multiline
                color="secondary"
                variant="outlined"
                type='text'
                label='Enter any Current Symptoms' 
                value={currentSymptoms} 
                onChange={(e)=>setSymptoms(e.target.value)}
            />
          </Grid>
          <Button variant = "contained" color="primary" type="submit">Update</Button>
          </Grid>
    </form>
  </div>
  <div>
  </div></>
    )
    }
}

const addMedication = ()=>{
  if (user.role==1){
    return(
      <div>
      <Typography textAlign={"center"} variant="h4">Add a Medication</Typography>
      <form onSubmit={handleAddFormSubmit}>
      <Grid container spacing={1}> 
      <Grid item xs={4}>
            <TextField
                required
                fullWidth
                multiline
                color="secondary"
                variant="outlined"
                type='text'
                label='Enter a medication name...' 
                onChange={handleAddFormChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
                required
                fullWidth
                multiline
                color="secondary"
                variant="outlined"
                type='text'
                label='Enter the dosage amount...' 
                onChange={handleAddFormChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
                required
                fullWidth
                multiline
                color="secondary"
                variant="outlined"
                type='time'
                label='Enter time of medication...' 
                onChange={handleAddFormChange}
            />
          </Grid>
          </Grid>
        <Button variant = "contained" color="primary" type="submit">Add</Button>
      </form>
      </div>
    )
  }
}
const childInfo = ()=>{
  if (!child.loading && child.child.length){
  
   return(
     <><h1>Child's Name {child.child[0].childsName}
       
       </h1><h1>Diagnosis {child.child[0].diagnosis}</h1><h1>Symptoms {child.child[0].currentSymptoms}</h1></>

   )
    

  }
}
return (
  <div className="app-container">
    {childInfo()}
    <form onSubmit={handleEditFormSubmit}>
      <table>
     
        <thead>
          <tr>
            <th>Medication Name</th>
            <th>Dosage</th>
            <th>Time of Meds</th>
            
        
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
                {addMedication()}
  </div>
);
  }

export default ChildsPage;