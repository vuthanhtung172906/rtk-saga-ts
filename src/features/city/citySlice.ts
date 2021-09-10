import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { City, ListResponse } from 'models';

export interface CityState {
  loading: boolean;
  list: City[];
}
const initialState: CityState = {
  list: [],
  loading: false,
};
const citySlice = createSlice({
  name: 'city',
  initialState: initialState,
  reducers: {
    fetchCityList(state) {
      state.loading = true;
    },
    fetchCityCuccess(state, action: PayloadAction<ListResponse<City>>) {
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchCityFail(state) {
      state.loading = false;
    },
  },
});

const cityReducer = citySlice.reducer;
export const selectCityList = (state: RootState) => state.city.list;
export const selectCityMap = createSelector(selectCityList, (cityList) =>
  cityList.reduce((map: { [key: string]: City }, city) => {
    map[city.code] = city;
    return map;
  }, {})
);
export const selectFormCity = createSelector(selectCityList, (cityList) =>
  cityList.map((city) => {
    return {
      label: city.name,
      value: city.code,
    };
  })
);
export default cityReducer;

export const cityActions = citySlice.actions;
