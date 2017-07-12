//import from packages and store
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import store from '../store';
//import components
import Sidebar from './Sidebar';
import Home from './Home';
import CampusList from './CampusList'
import StudentList from './StudentList';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import WinterJokes from './WinterJokes';


//Have a Sidebar and multiple main components
function Root () {
  return (
    <div className="container">
      <Sidebar />
      <div className="col-sm-9">
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/campuses" component={CampusList} />
            <Route exact path="/students" component={StudentList} />
            {/*<Route path="/campuses/:campusId" component={SingleCampus} />
            <Route path="/students/studentId" component={SingleStudent} />*/}
            <Route path="/winter-jokes" component={WinterJokes} />
          </Switch>
        </main>
      </div>
    </div>
  )
}

export default Root;
