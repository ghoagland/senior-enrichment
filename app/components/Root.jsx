//import from packages and store
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import store from '../store';
import { fetchStudents, fetchCampuses } from '../reducers'
//import components
import Navbar from './Navbar'
import Sidebar from './Sidebar';
import Home from './Home';
import CampusList from './CampusList'
import StudentList from './StudentList';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import NewCampus from './NewCampus';
import NewStudent from './NewStudent';
import EditCampus from './EditCampus';
import EditStudent from './EditStudent';
import WinterJokes from './WinterJokes';

//Have a Sidebar and multiple main components
class Root extends Component {

  componentDidMount () {
    const studentsThunk = fetchStudents();
    const campusesThunk = fetchCampuses();
    store.dispatch(studentsThunk);
    store.dispatch(campusesThunk);
  }

  render () {
    return (
      <div className="container">
        <Navbar />
        <Sidebar />
        <div className="col-sm-10">
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/campuses" component={CampusList} />
              <Route exact path="/students" component={StudentList} />
              <Route exact path="/campuses/add" component={NewCampus} />
              <Route exact path="/students/add" component={NewStudent} />
              <Route exact path="/campuses/:campusId/edit" component={EditCampus} />
              <Route exact path="/students/:studentId/edit" component={EditStudent} />
              <Route path="/campuses/:campusId" component={SingleCampus} />
              <Route path="/students/:studentId" component={SingleStudent} />
              <Route path="/winter-jokes" component={WinterJokes} />
            </Switch>
          </main>
        </div>
      </div>
    )
  }
}

export default Root;
