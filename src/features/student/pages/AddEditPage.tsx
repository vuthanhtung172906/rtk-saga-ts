import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import * as React from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import { toast } from 'react-toastify';
export default function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = React.useState<Student>();
  React.useEffect(() => {
    if (!studentId) return;

    // IFFE
    (async () => {
      try {
        const getStudent = await studentApi.getById(studentId);
        setStudent(getStudent);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [studentId]);
  console.log(student);
  const inititalValue: Student = {
    name: '',
    mark: '',
    city: '',
    gender: 'male',
    age: '',
    ...student,
  } as Student;
  const history = useHistory();
  const handleSubmitStudentForm = async (formValue: Student) => {
    if (isEdit) {
      await studentApi.update(formValue);
    } else {
      await studentApi.add(formValue);
    }
    toast.success(' Save student success');
    history.push('/admin/student');
  };
  return (
    <div>
      <Box>
        <Box>
          <Link to="/admin/student" style={{ textDecoration: 'none' }}>
            <Typography
              variant="caption"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <ChevronLeft />
              Back
            </Typography>
          </Link>
        </Box>
        <Typography variant="h4">
          {isEdit ? 'Update student info' : 'Add new student'}
        </Typography>

        <Box maxWidth="500px">
          {(!isEdit || Boolean(student)) && (
            <StudentForm
              inititalValue={inititalValue}
              onSubmit={handleSubmitStudentForm}
            />
          )}
        </Box>
      </Box>
    </div>
  );
}
