import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchBosses() {
  try {

    const response = yield axios.get('http://localhost:5001/getBosses');
    console.log('in getBosses.saga, ', response)

    yield put({ type: 'SET_BOSSES', payload: response.data });
  } catch (error) {
    console.log('getBosses.saga failed', error);
  }
}

function* getBossesSaga() {
  yield takeLatest('FETCH_BOSSES', fetchBosses);
}

export default getBossesSaga;