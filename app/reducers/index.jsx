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


const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    case GET_STUDENTS:
      return {...state, students: action.students};
    case GET_STUDENT:
      return {...state, currentStudent: action.currentStudent};
    case GET_CAMPUSES:
      return {...state, campuses: action.campuses};
    case GET_CAMPUS:
      return {...state, currentCampusId: action.currentCampusId}
    case GET_NEW_CAMPUS:
      return {...state, campuses: [...campuses, action.campus]}
    default: return state
  }
};

export default rootReducer;
