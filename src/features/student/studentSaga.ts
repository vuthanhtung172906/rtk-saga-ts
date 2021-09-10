import { call, debounce, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from 'api/studentApi';
import { ListParams, ListResponse, Student } from 'models';
import { studentAction } from './studentSlice';
function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(
      studentApi.getAll,
      action.payload
    );
    yield put(studentAction.fetchStudentListSuccess(response));
  } catch (error) {
    console.log(error);
    yield put(studentAction.fetchStudentListFailed());
  }
}
function* setFilterDebounce(action: PayloadAction<ListParams>) {
  yield put(studentAction.setFilter(action.payload));
}
export default function* studentSaga() {
  yield takeLatest(studentAction.fetchStudentList.type, fetchStudentList);
  yield debounce(500, studentAction.setFilterDebounce.type, setFilterDebounce);
}
