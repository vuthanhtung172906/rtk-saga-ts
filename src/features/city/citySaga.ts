import { call, put, takeLatest } from '@redux-saga/core/effects';
import cityApi from 'api/cityApi';
import { City, ListResponse } from 'models';
import { cityActions } from './citySlice';

function* fetchCityList() {
  try {
    const responseCity: ListResponse<City> = yield call(cityApi.getAll);
    yield put(cityActions.fetchCityCuccess(responseCity));
  } catch (error) {
    yield put(cityActions.fetchCityFail());
  }
}

export default function* citySaga() {
  yield takeLatest(cityActions.fetchCityList.toString(), fetchCityList);
}
