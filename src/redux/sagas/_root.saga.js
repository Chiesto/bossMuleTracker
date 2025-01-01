import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import getCharactersSaga from './getCharacters.saga';
import getBossesSaga from './getBosses.saga';
import getUserCharactersSaga from './getUserCharacters.saga';
import postUserCharactersSaga from './postUserCharacter.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    getCharactersSaga(),
    getBossesSaga(),
    getUserCharactersSaga(),
    postUserCharactersSaga(),
    
  ]);
}
