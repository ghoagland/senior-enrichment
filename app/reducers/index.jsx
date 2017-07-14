import { combineReducers } from 'redux'
import axios from 'axios';
import campusReducer from './campuses'
import studentReducer from './students'

const rootReducer = combineReducers({campusReducer, studentReducer})

export default rootReducer;
export * from './students';
export * from './campuses';
