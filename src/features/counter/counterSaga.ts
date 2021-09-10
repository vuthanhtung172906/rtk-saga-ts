import { PayloadAction } from '@reduxjs/toolkit';
import { delay, put, takeLatest } from '@redux-saga/core/effects';
import { incrementSaga, incrementSagaSuccess } from './counterSlice';

export function* handleIncrementSagasuccess(action: PayloadAction<number>) {
  yield delay(1000);
  yield put(incrementSagaSuccess(action.payload));
}
export default function* counterSaga() {
  // yield takeEvery(incrementSaga.toString(), handleIncrementSagasuccess);
  yield takeLatest(incrementSaga.toString(), handleIncrementSagasuccess);
}
