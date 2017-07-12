import axios from 'axios';

// ACTION TYPES
const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';

// ACTION CREATORS

export function getStudents(students  ) {
  const action = {type: GET_STUDENTS, students};
  return action;
}

export function getStudent(student) {
  const action = {type: GET_STUDENT, student};
  return action
}

// THUNK CREATORS

export function fetchStudents() {
  return function thunk(dispatch) {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => {
        const action = getStudents(students);
        dispatch(action)
      })
  }
}

export function fetchStudent(studentId) {
  return function thunk(dispatch) {
    return axios.get('/api/students/studentId')
      .then(res => res.data)
      .then(student => {
        const action = getStudent(student);
        dispatch(action)
      })
  }
}

// REDUCER

export default function studentReducer(state)
