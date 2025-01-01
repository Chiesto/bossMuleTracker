import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* postUserCharacters(action) {
  try {
    console.log('in postUserCharacters.saga, ', action.payload)
    const response = yield axios.post(`http://localhost:5001/postUserCharacter`, action.payload);
    console.log(response)

    yield put({type: 'FETCH_USER_CHARACTERS', payload: action.payload.user_id});
  } catch (error) {
    console.log('postUserCharacters.saga failed', error);
  }
}

function* postUserCharactersSaga() {
  yield takeLatest('POST_USER_CHARACTER', postUserCharacters);
}

export default postUserCharactersSaga;