import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import * as React from 'react';

export interface StatictisItemProps {
  icon: React.ReactElement;
  label: String;
  value: String | Number;
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2, 1),
  },
  detail: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
export default function StatictisItem({
  icon,
  label,
  value,
}: StatictisItemProps) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Box>{icon}</Box>
      <Box className={classes.detail}>
        <Typography variant="h5">{value}</Typography>
        <Typography variant="caption">{label}</Typography>
      </Box>
    </Paper>
  );
}
