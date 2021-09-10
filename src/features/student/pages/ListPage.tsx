import {
  Box,
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as React from 'react';
import StudentTable from '../components/StudenTable';
import { studentAction } from '../studentSlice';
import Pagination from '@material-ui/lab/Pagination';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import FilterStudent from '../components/FilterStudent';
import { ListParams, Student } from 'models';
import studentApi from 'api/studentApi';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  titleList: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: ' center',
    marginBottom: theme.spacing(4),
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '200vh',
  },
}));
export default function ListPage() {
  const dispatch = useAppDispatch();
  const match = useRouteMatch();
  const classes = useStyles();
  const studentList = useAppSelector((state) => state.student);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);
  React.useEffect(() => {
    dispatch(studentAction.fetchStudentList(studentList.filter));
  }, [dispatch, studentList.filter]);
  const handleChangePage = (event: any, page: number) => {
    dispatch(
      studentAction.setFilter({
        ...studentList.filter,
        _page: page,
      })
    );
  };
  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentAction.setFilterDebounce(newFilter));
  };
  const handleCityChange = (newFilter: ListParams) => {
    dispatch(studentAction.setFilter(newFilter));
  };
  const handleOnRemove = async (student: Student) => {
    try {
      await studentApi.remove(student?.id || ' ');
      dispatch(studentAction.setFilter({ ...studentList.filter }));
    } catch (error) {
      console.log(error);
    }
  };
  const history = useHistory();
  const handleOnEdit = (student: Student) => {
    history.push(`${match.url}/${student.id}`);
  };
  return (
    <Box className={classes.root}>
      {studentList.loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.titleList}>
        <Typography variant="h4">Students</Typography>
        <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>
      <Box>
        {/* Filter */}
        <FilterStudent
          cityList={cityList}
          filterParams={studentList.filter}
          onSearchChange={handleSearchChange}
          onChange={handleCityChange}
        />
      </Box>
      <StudentTable
        onEdit={handleOnEdit}
        onRemove={handleOnRemove}
        studentList={studentList?.list}
        cityMap={cityMap}
      />
      <Box marginY={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(
            studentList.pagination?._totalRows / studentList.pagination?._limit
          )}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
}
