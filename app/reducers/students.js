import axios from 'axios';

//Student state GET

const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';

export function getStudents(students) {
  const action = {type: GET_STUDENTS, students};
  return action;
}

export function getStudent(studentId) {
  const action = {
    type: GET_STUDENT,
    currentStudentId: studentId
  };
  return action;
}

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

//POST student
const GET_NEW_STUDENT = 'GET_NEW_STUDENT';

export function getNewStudent (student) {
  const action = {type: GET_NEW_STUDENT, student};
  return action;
}

export function addStudent(studentWithCampus) {
  return function thunk(dispatch) {
    return axios.post('/api/students', studentWithCampus)
      .then(res => res.data)
      .then(newStudent => {
        const action = getNewStudent(newStudent);
        dispatch(action);
      });
  }
}

//PUT Student
const EDIT_STUDENT = 'EDIT_STUDENT';

export function editStudent (editedStudent) {
  const action = {type: EDIT_STUDENT, editedStudent}
  return action;
}

export function putStudent(student) {
  return function thunk(dispatch) {
    return axios.put(`/api/students/${student.id}`, student)
      .then(res => res.data.student)
      .then(editedStudent => {
        const action = editStudent(editedStudent);
        dispatch(action);
      });
  }
}

//DELETE student
const DELETE_STUDENT = 'DELETE_STUDENT';

export function deleteStudent (deletedStudentId) {
  const action = {type: DELETE_STUDENT, deletedStudentId}
  return action;
}

export function destroyStudent (studentId) {
  return function thunk(dispatch) {
    return axios.delete(`/api/students/${studentId}`)
      .then(res => res.data)
      .then(deletedStudent => {
        const action = deleteStudent(deletedStudent.id);
        dispatch(action);
      });
  }
}

//Remove campusID from student
const REMOVE_STUDENT_CAMPUS = 'REMOVE_STUDENT_CAMPUS';

export function removeStudentCampus (student) {
  const action = {type: REMOVE_STUDENT_CAMPUS, student}
  return action;
}

export function removeCampusFromStudent (student) {
  return function thunk(dispatch) {
    return axios.put(`/api/students/${student.id}/remove-campus`, student)
    .then(res => {
      return res.data.student
    })
    .then(updatedStudent => {
      const action = removeStudentCampus(updatedStudent)
      dispatch(action);
    })
  }
}

const studentReducer = function (state = {students: [], currentStudentId: 0}, action) {
  switch(action.type) {

    case GET_STUDENTS:
      return {...state, students: action.students};

    case GET_STUDENT:
      return {...state, currentStudentId: action.currentStudentId};

    case GET_NEW_STUDENT:
      return {...state, students: [...state.students, action.student]}

    case EDIT_STUDENT:
      const idx = state.students.findIndex(elem => elem.id === action.editedStudent.id);
      return {...state, students: [...state.students.slice(0, idx), action.editedStudent, ...state.students.slice(idx+1)] }

    case DELETE_STUDENT:
      const deleteStudentIndex = state.students.findIndex(elem => elem.id === state.currentStudentId);
      const deleteStudentState = {
        ...state,
        students: ([...state.students.slice(0, deleteStudentIndex), ...state.students.slice(deleteStudentIndex+1)])
      }
      return deleteStudentState;

    case REMOVE_STUDENT_CAMPUS:
      const removedIndex = state.students.findIndex(elem => elem.id === action.student.id);
      return {...state, students: [...state.students.slice(0, removedIndex), action.student, ...state.students.slice(removedIndex+1)]};

    default: return state;
  }
}

export default studentReducer;
