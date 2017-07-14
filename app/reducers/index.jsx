import { combineReducers } from 'redux'
import axios from 'axios';

const initialState = {
  students: [],
  campuses: [],
  currentStudentId: 0,
  currentCampusId: 0,
}

// ACTION TYPES
const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_CAMPUS = 'GET_CAMPUS';

const GET_NEW_CAMPUS = 'GET_NEW_CAMPUS';
const GET_NEW_STUDENT = 'GET_NEW_STUDENT';
const EDIT_CAMPUS = 'EDIT_CAMPUS';
const EDIT_STUDENT = 'EDIT_STUDENT';

// ACTION CREATORS
export function getStudents(students) {
  const action = {type: GET_STUDENTS, students};
  return action;
}

export function getStudent(studentId, students) {
  const action = {
    type: GET_STUDENT,
    currentStudentId: studentId
  };
  return action;
}

export function getCampuses(campuses) {
  const action = {type: GET_CAMPUSES, campuses};
  return action;
}

export function getCampus(campusId) {
  const action = {
    type: GET_CAMPUS,
    currentCampusId: campusId
  };
  return action;
}

export function getNewCampus (campus) {
  const action = {type: GET_NEW_CAMPUS, campus};
  return action;
}

export function getNewStudent (student) {
  const action = {type: GET_NEW_STUDENT, student};
  return action;
}

export function editCampus (editedCampus) {
  const action = {type: EDIT_CAMPUS, editedCampus}
}

export function editStudent (editedStudent) {
  const action = {type: EDIT_STUDENT, editedStudent}
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

export function fetchCampuses() {
  return function thunk(dispatch) {
    return axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        const action = getCampuses(campuses);
        dispatch(action)
      })
  }
}

export function addCampus(campus) {
  return function thunk(dispatch) {
    return axios.post('/api/campuses', campus)
      .then(res => res.data)
      .then(newCampus => {
        const action = getNewCampus(newCampus);
        return action;
      });
  }
}

export function addStudent(studentWithCampus) {
  return function thunk(dispatch) {
    return axios.post('/api/students', studentWithCampus)
      .then(res => res.data)
      .then(newStudent => {
        const action = getNewStudent(newStudent);
        return action;
      });
  }
}

export function putCampus(campus) {
  return function thunk(dispatch) {
    return axios.put(`/api/campuses/${campus.id}`, campus)
      .then(res => res.data)
      .then(editedCampus => {
        const action = editCampus(editedCampus);
        return action;
      });
  }
}

export function putStudent(student) {
  return function thunk(dispatch) {
    return axios.put(`/api/students/${student.id}`, student)
      .then(res => res.data)
      .then(editedStudent => {
        const action = editStudent(editedStudent);
        return action;
      });
  }
}


const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    case GET_STUDENTS:
      return {...state, students: action.students};
    case GET_STUDENT:
      return {...state, currentStudent: action.currentStudent};
    case GET_CAMPUSES:
      return {...state, campuses: action.campuses};
    case GET_CAMPUS:
      return {...state, currentCampusId: action.currentCampusId};
    case GET_NEW_CAMPUS:
      return {...state, campuses: [...campuses, action.campus]};
    case GET_NEW_STUDENT:
      return {...state, students: [...students, action.student]}
    case EDIT_CAMPUS:
      const index = state.campuses.findIndex(elem => elem.id === action.editedCampus.id)
      return {...state, campuses: [...state.campuses.slice(0, index), action.editedCampus, state.campuses.slice(index+1)] }
    case EDIT_STUDENT:
      const idx = state.students.findIndex(elem => elem.id === action.editedCampus.id)
      return {...state, students: [...state.students.slice(0, idx), action.editedstudent, state.students.slice(idx+1)] }
    default: return state
  }
};

export default rootReducer;
