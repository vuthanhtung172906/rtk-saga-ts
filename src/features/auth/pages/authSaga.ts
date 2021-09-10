import { fork, take, call, delay, put } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { authAction, LoginPayload } from './authSlice';
import { push } from 'connected-react-router';
function* handleLogin(payload: LoginPayload) {
  try {
    console.log('Click handle Login', payload);
    yield delay(1000);
    localStorage.setItem('accesstoken', 'ddhjioquewqehjqjh');
    yield put(
      authAction.loginSuccess({
        id: '1',
        name: 'tung',
      })
    );

    //redirec to admin page
    yield put(push('/admin/dashboard'));
  } catch (error) {
    yield put(authAction.loginFailed('Login failed'));
  }
}
function* handleLogOut() {
  yield delay(1000);
  localStorage.removeItem('accesstoken');
  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = localStorage.getItem('accesstoken');
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(
        authAction.login.type
      );
      yield fork(handleLogin, action.payload);
    }
    yield take(authAction.logout.type);
    yield call(handleLogOut);
  }
}
export default function* authSaga() {
  yield fork(watchLoginFlow);
}
