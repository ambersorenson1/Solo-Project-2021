import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* AddChildMedications(action) {
  try {
    console.log('action',action)
    const response = yield axios({
      method: 'POST',
      url: '/api/medication',
      data: action.payload
    })
    console.log("lets see",response.data);
    yield put({
      type: 'ADD_MEDICATION',
      payload: response.data
    })
  } catch(err) {
    console.error('ADD ERROR', err)
  }
};

function* AddChild(action) {
  try {
    console.log('action',action)
    const response = yield axios({
      method: 'POST',
      url: '/api/children',
      data: action.payload
    })
    console.log("lets see",response.data);
    yield put({
      type: 'ADD_CHILDREN',
      payload: response.data
    })
  } catch(err) {
    console.error('ADD ERROR', err)
  }
};

  function* EditChildMedications(action) {
    try {
      console.log('ACTION', action);
      
      const response = yield axios({
        method: 'PUT',
        url: `/api/medication/${action.payload.id}`,
        data: action.payload
      })
      console.log(response.data)
      yield put({ 
        type: 'EDIT_MEDICATION', 
        payload: response.data
      });
    } catch(err) {
      console.error('EDIT MEDS ERROR', err)
    }
};

function* DeleteChildMedications(action) {
  try {
    console.log('ACTION', action);
    
    const response = yield axios({
      method: 'DELETE',
      url: `/api/medication/${action.payload.id}`,
      data: action.payload
    })
    yield put({ 
      type: 'DELETE_MEDICATION', 
      payload: response.data
    });
  } catch(err) {
    console.error('DELETE MEDS ERROR', err)
  }
};

function* SaveChildMedications(action) {
  try {
    console.log('ACTION', action);
    
    const response = yield axios({
      method: 'PUT',
      url: `/api/medication/${action.id}`,
      data: action.payload
    })
    console.log(response.data)
  } catch(err) {
    console.error('SAVE MEDS ERROR', err)
  }
};


function* fetchMedications(action) {
  try {
    console.log('action',action)
    const response = yield axios({
      method: 'GET',
      url: '/api/medication',
    })
    console.log(response.data)
    yield put({
      type: 'GET_MEDICATION',
      payload: response.data
    })
  } catch(err) {
    console.error('ADD error', err)
  }
};


function* childsInfoSaga() {
  yield takeLatest('ADD_MED', AddChildMedications);
  yield takeLatest('ADD_CHILD', AddChild);
  yield takeLatest('FETCH_MED', fetchMedications);
  yield takeLatest('EDIT_MED', EditChildMedications);
  yield takeLatest('SAVE_MED', SaveChildMedications);
  yield takeLatest('DELETE_MED', DeleteChildMedications)
}

export default childsInfoSaga;