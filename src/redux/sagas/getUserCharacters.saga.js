import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUserCharacters(action) {
  try {

    const response = yield axios.get(`http://localhost:5001/getUserCharacters/${action.payload}`);
    console.log('in getUserCharacters.saga, ', response)

    yield put({ type: 'SET_USER_CHARACTERS', payload: response.data });
  } catch (error) {
    console.log('getUserCharacters.saga failed', error);
  }
}

function* getUserCharactersSaga() {
  yield takeLatest('FETCH_USER_CHARACTERS', fetchUserCharacters);
}

export default getUserCharactersSaga;