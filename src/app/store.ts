import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { connectRouter } from 'connected-react-router';
import createSagaMiddleWare from 'redux-saga';
import rootSaga from './rootSaga';
import authReducer from 'features/auth/pages/authSlice';
import { history } from 'utils';
import { routerMiddleware } from 'connected-react-router';
import dashboardReducer from 'features/dashboard/dashboardSlice';
import studentReducer from 'features/student/studentSlice';
import cityReducer from 'features/city/citySlice';
const sageMiddleWare = createSagaMiddleWare();
const rootReducer = combineReducers({
  router: connectRouter(history),
  counter: counterReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
  student: studentReducer,
  city: cityReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sageMiddleWare, routerMiddleware(history)),
});
sageMiddleWare.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
