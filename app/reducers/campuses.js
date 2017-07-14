import axios from 'axios';

//Campus State GET
const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_CAMPUS = 'GET_CAMPUS';

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

//POST campus
const GET_NEW_CAMPUS = 'GET_NEW_CAMPUS';

export function getNewCampus (campus) {
  const action = {type: GET_NEW_CAMPUS, campus};
  return action;
}
export function addCampus(campus) {
  return function thunk(dispatch) {
    return axios.post('/api/campuses', campus)
      .then(res => res.data)
      .then(newCampus => {
        const action = getNewCampus(newCampus);
        dispatch(action);
      });
  }
}

//PUT campus
const EDIT_CAMPUS = 'EDIT_CAMPUS';

export function editCampus (editedCampus) {
  const action = {type: EDIT_CAMPUS, editedCampus}
  return action;
}

export function putCampus(campus) {
  return function thunk(dispatch) {
    return axios.put(`/api/campuses/${campus.id}`, campus)
      .then(res => res.data.campus)

      .then(editedCampus => {
        const action = editCampus(editedCampus);
        dispatch(action);
      });
  }
}

//DELETE campus
const DELETE_CAMPUS = 'DELETE_CAMPUS';

export function deleteCampus (deletedCampusId) {
  const action = {type: DELETE_CAMPUS, deletedCampusId}
  return action;
}

export function destroyCampus (campusId) {
  return function thunk(dispatch) {
    return axios.delete(`/api/campuses/${campusId}`)
      .then(res => res.data)
      .then(deletedCampus => {
        const action = deleteCampus(deletedCampus.id);
        dispatch(action);
      });
  }
}

const campusReducer = function (state = {campuses: [], currentCampusId: 0}, action) {
  switch(action.type) {
    case GET_CAMPUSES:
      return {...state, campuses: action.campuses};
    case GET_CAMPUS:
      return {...state, currentCampusId: action.currentCampusId};

    case GET_NEW_CAMPUS:
      return {...state, campuses: [...state.campuses, action.campus]};

    case EDIT_CAMPUS:
      const index = state.campuses.findIndex(elem => elem.id === action.editedCampus.id);
      return {...state, campuses: [...state.campuses.slice(0, index), action.editedCampus, ...state.campuses.slice(index+1)] };

    case DELETE_CAMPUS:
      const deleteCampusIndex = state.campuses.findIndex(elem => elem.id === state.currentCampusId);
      console.log(deleteCampusIndex, state.campuses)
      const deletedCampusState = {
        ...state,
        campuses: (deleteCampusIndex + 1) < state.campuses.length
            ? [
              ...state.campuses.slice(0, deleteCampusIndex),
              ...state.campuses.slice(deleteCampusIndex + 1)
              ]
            : state.campuses.slice(0, deleteCampusIndex)
      }
      return deletedCampusState;

    default: return state;
  }
}

export default campusReducer;
