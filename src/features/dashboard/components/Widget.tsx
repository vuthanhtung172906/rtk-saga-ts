import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import * as React from 'react';

export interface WidgetProps {
  title: String;
  children: any;
}
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
  },
}));
export default function Widget(props: WidgetProps) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography>{props.title}</Typography>
      <Box marginTop={2}>{props.children}</Box>
    </Paper>
  );
}
