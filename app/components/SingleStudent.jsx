//to do: set up so it connects/rereders when there are new students

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getStudent } from '../reducers';


class SingleStudent extends Component {
  componentDidMount () {
    this.props.getStudent(+this.props.match.params.studentId)
  }

  render() {
    console.log("studentid", this.props.currentStudentId)
    const currentStudent = this.props.students.find(elem => elem.id === this.props.currentStudentId)
    if (currentStudent) {
      const currentStudentCampus = this.props.campuses.find(elem => elem.id === currentStudent.campusId)
      return (
        <div>
          <h1>{currentStudent.name}</h1>
          <hr></hr>
          <h5>email: {currentStudent.email}</h5>
          <h5>house: {currentStudentCampus ? (
              <Link to={`/campuses/${currentStudentCampus.id}`}>
                {currentStudentCampus.name}
              </Link>
              ) : 'none'
          }
          </h5>
          <button type="button">
            <Link to={`/students/${this.props.currentStudentId}/edit`}>Edit student</Link>
          </button>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Current Student not found</h2>
        </div>
      )
    }
  }
}


//connecting to store

const mapStateToProps = function(state, ownProps) {
  const studentId = Number(ownProps.match.params.studentId);
  return {
    students: state.students,
    campuses: state.campuses,
    currentStudentId: state.currentStudentId

  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    getStudent(studentId) {
      dispatch(getStudent(studentId));
    }
  }
}

const StatefulSingleStudent = withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleStudent))


export default StatefulSingleStudent
