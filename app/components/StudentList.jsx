import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { withRouter } from 'react-router-dom'

function StudentList(props) {
  return (
    <div>
      <ul>
        {props.students.map(student => {
          return (
            <li key={student.id}>{student.name}</li>
          )
        })}
      </ul>
    </div>
  )
}

//connecting to store

const mapStateToProps = function(state) {
  return {
    students: state.students
  }
}

const StatefulStudentList = withRouter(connect(mapStateToProps)(StudentList))

export default StatefulStudentList;
