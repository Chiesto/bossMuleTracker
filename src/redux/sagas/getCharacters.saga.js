import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchCharacters() {
  try {

    const response = yield axios.get('http://localhost:5001/getCharacters');
    console.log('in getCharacters.saga, ', response)

    yield put({ type: 'SET_CHARACTERS', payload: response.data });
  } catch (error) {
    console.log('getCharacters.saga failed', error);
  }
}

function* getCharactersSaga() {
  yield takeLatest('FETCH_CHARACTERS', fetchCharacters);
}

export default getCharactersSaga;