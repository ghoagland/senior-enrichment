import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getStudent } from '../reducers';


class SingleStudent extends Component {
  componentDidMount () {
    this.props.getStudent(+this.props.match.params.studentId)
  }

  render() {
    const currentStudent = this.props.students.find(elem => elem.id === this.props.currentStudentId)
    const currentStudentCampus = this.props.campuses.find(elem => elem.id === currentStudent.campusId)

    if (currentStudent && currentStudentCampus) {
      return (
        <div>
          <section>
            <h1>{currentStudent.name}</h1>
            <h5>email: {currentStudent.email}</h5>
          </section>
          <h5>campus: <Link to={`/campuses/${currentStudentCampus.id}`}>
              {currentStudentCampus.name}
            </Link>
          </h5>
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
    currentStudentId: studentId

  }
}

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    getStudent(studentId) {
      dispatch(getStudent(studentId));
    }
  }
}

const StatefulSingleStudent = withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleStudent))


export default StatefulSingleStudent
