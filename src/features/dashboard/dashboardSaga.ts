import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import cityApi from 'api/cityApi';
import studentApi from 'api/studentApi';
import { City, ListResponse, Student } from 'models';
import { dashboardAction, RankingByCity } from './dashboardSlice';

function* fetchStatitics() {
  const responseApi: Array<ListResponse<Student>> = yield all([
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'male' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'female' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
  ]);
  const statisList = responseApi.map((x) => x.pagination._totalRows);
  const [maleCount, femaleCount, highestCount, lowestCount] = statisList;
  yield put(
    dashboardAction.setStatistics({
      maleCount: maleCount,
      femaleCount: femaleCount,
      highMarkCount: highestCount,
      lowMarkCount: lowestCount,
    })
  );
}
function* fetchHighestStudent() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'desc',
  });

  yield put(dashboardAction.setHighestStudent(data));
}

function* fetchLowestStudent() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'asc',
  });

  yield put(dashboardAction.setLowestStudent(data));
}
function* fetchRankingByCity() {
  //fetch city list
  const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);
  //fetch ranking
  const callList = cityList.map((x) =>
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: 'mark',
      _order: 'desc',
      city: x.code,
    })
  );
  const responseList: ListResponse<Student>[] = yield all(callList);
  const rankingById: RankingByCity[] = responseList.map((x, idx) => ({
    cityId: cityList[idx].code,
    cityName: cityList[idx].name,
    rankingList: x.data,
  }));

  yield put(dashboardAction.setRankingByCity(rankingById));
}
function* fetchData() {
  try {
    yield all([
      call(fetchStatitics),
      call(fetchHighestStudent),
      call(fetchLowestStudent),
      call(fetchRankingByCity),
    ]);
    yield put(dashboardAction.fetchDataSuccess());
  } catch (error) {
    console.log('Fetch fail', error);
  }
}
export default function* dashboardSaga() {
  yield takeLatest(dashboardAction.fetchData.toString(), fetchData);
}
