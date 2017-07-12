import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

function StudentList(props) {
  return (
    <div>
      <h3>List of Students:</h3>
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
