import {
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as React from 'react';
import { authAction } from './authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  box: {
    padding: theme.spacing(2),
  },
}));
export default function LoginPage() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isLogging = useAppSelector((state) => state.auth.logging);
  const handleClickLogin = () => {
    dispatch(
      authAction.login({
        username: '',
        password: '',
      })
    );
  };
  return (
    <div className={classes.root}>
      <Paper elevation={4}>
        <Typography variant="h5" component="h1" className={classes.box}>
          Student Management
          <Box marginTop="30px">
            <Button
              color="primary"
              fullWidth
              variant="contained"
              onClick={handleClickLogin}
            >
              {isLogging && <CircularProgress size={30} color="secondary" />}
              &nbsp; Fake Login
            </Button>
          </Box>
        </Typography>
      </Paper>
    </div>
  );
}
