import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'

function StudentList(props) {
  return (
    <div>
      <h3>Hogwarts Students:</h3>
      <ul>
        {props.students.map(student => {
          return (
            <li key={student.id}>
              <Link to={`/students/${student.id}`}>
                {student.name}
              </Link>
            </li>
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
