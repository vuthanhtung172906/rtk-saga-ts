import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { City, Student } from 'models';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { captilizeString, changeColorMark } from 'utils';

const useStyles = makeStyles((theme) => ({
  table: {},
  buttonAction: {
    marginLeft: theme.spacing(1),
  },
}));
export interface StudentTableProps {
  studentList: Student[];
  cityMap: {
    [key: string]: City;
  };
  onEdit: (student: Student) => void;
  onRemove: (student: Student) => void;
}

export default function StudentTable({
  studentList,
  cityMap,
  onEdit,
  onRemove,
}: StudentTableProps) {
  const [open, setOpen] = React.useState(false);
  const [studentSelector, setStudentSelector] = useState<Student>();

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenDialog = (student: Student) => {
    setStudentSelector(student);
    setOpen(true);
  };
  const handleRemove = () => {
    onRemove(studentSelector as Student);
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <>
      <TableContainer>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((student, idx) => (
              <TableRow key={idx}>
                <TableCell width={320}>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell> {captilizeString(student.gender)}</TableCell>
                <TableCell>
                  <Box color={changeColorMark(student.mark)}>
                    {student.mark}
                  </Box>
                </TableCell>
                <TableCell> {cityMap[student.city]?.name}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => onEdit?.(student)} color="primary">
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleOpenDialog(student)}
                    className={classes.buttonAction}
                    color="secondary"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Remove this student?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure remove "{studentSelector?.name}"? <br />
              This action can&apos;t be undo.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={handleRemove}
              variant="contained"
              color="secondary"
              autoFocus
            >
              Remove
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
