import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListParams, PaginationParams, Student, ListResponse } from 'models';

export interface StudentState {
  loading: boolean;
  list: Student[];
  filter: ListParams;
  pagination: PaginationParams;
}

const initialState: StudentState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 15,
  },
  pagination: {
    _limit: 15,
    _page: 1,
    _totalRows: 15,
  },
};
const studentSlice = createSlice({
  name: 'student',
  initialState: initialState,
  reducers: {
    fetchStudentList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchStudentListSuccess(
      state,
      action: PayloadAction<ListResponse<Student>>
    ) {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    fetchStudentListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },
    setFilterDebounce(state, action: PayloadAction<ListParams>) {},
  },
});

const studentReducer = studentSlice.reducer;
export default studentReducer;
export const studentAction = studentSlice.actions;
