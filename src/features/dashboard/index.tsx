import {
  Box,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {
  ChatSharp,
  Markunread,
  PeopleAlt,
  PhoneAndroid,
} from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import StatictisItem from './components/StatisticItem';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';
import { dashboardAction } from './dashboardSlice';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '200vh',
  },
}));
export default function Dashboard() {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const {
    loading,
    highestStudentList,
    lowestStudentList,
    statistics,
    rankingByCity,
  } = useAppSelector((state) => state.dashboard);
  console.log({
    loading,
    highestStudentList,
    lowestStudentList,
    statistics,
    rankingByCity,
  });
  useEffect(() => {
    dispatch(dashboardAction.fetchData());
  }, [dispatch]);
  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      {/* Statitics  */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatictisItem
            value={statistics.maleCount}
            label="Male"
            icon={<PeopleAlt fontSize="large" color="primary" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatictisItem
            value={statistics.femaleCount}
            label="Female"
            icon={<PhoneAndroid fontSize="large" color="primary" />}
          />
        </Grid>{' '}
        <Grid item xs={12} md={6} lg={3}>
          <StatictisItem
            value={statistics.highMarkCount}
            label="mark >= 8"
            icon={<Markunread fontSize="large" color="primary" />}
          />
        </Grid>{' '}
        <Grid item xs={12} md={6} lg={3}>
          <StatictisItem
            value={statistics.lowMarkCount}
            label="mark <= 5"
            icon={<ChatSharp fontSize="large" color="primary" />}
          />
        </Grid>
      </Grid>
      {/* All Studente ranking */}
      <Box mt={4}>
        <Typography variant="h4">All Student</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with Highest mark">
                <StudentRankingList studentList={highestStudentList} />
              </Widget>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <Widget title="Student with Lowest mark">
                <StudentRankingList studentList={lowestStudentList} />
              </Widget>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box mt={4}>
        <Typography variant="h4">Ranking By City</Typography>
        <Box mt={2}>
          <Grid container spacing={3}>
            {rankingByCity.map((city, idx) => (
              <Grid item xs={12} md={6} lg={3} key={idx}>
                <Widget title={`TP. ${city.cityName}`}>
                  <StudentRankingList studentList={city.rankingList} />
                </Widget>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
