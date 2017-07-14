//to do: set up so it connects/rereders when there are new campuses


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getCampus } from '../reducers';

class SingleCampus extends Component {
  componentDidMount () {
    this.props.getCampus(+this.props.match.params.campusId)
  }

  render() {
    const currentCampus = this.props.campuses.find(elem => elem.id === this.props.currentCampusId)
    const currentCampusStudents = this.props.students.filter(elem => elem.campusId === this.props.currentCampusId)
    if (currentCampus) {
      return (
        <div>
          <section>
            <h1>{currentCampus.name}</h1>
            <img src={currentCampus.image} style={{width:'200px', height:'248px'}} />
          </section>
          <hr></hr>
          <h3>{currentCampus.name} students:</h3>
          <ul>
          {currentCampusStudents.map(student => {
            return (
              <li key={student.id}>
                <Link to={`/students/${student.id}`}>{student.name}</Link>
              </li>
            )
          })}
          </ul>
          <button type="button">
            <Link to={`/campuses/${this.props.currentCampusId}/edit`}>Edit house</Link>
          </button>
        </div>
      )
    }

    return (
      <div>
        <h2>Current Campus not found</h2>
      </div>
    )
  }
}


//connecting to store

const mapStateToProps = function(state, ownProps) {
  return {
    students: state.students,
    campuses: state.campuses,
    currentCampusId: state.currentCampusId

  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    getCampus(campusId) {
      dispatch(getCampus(campusId));
    }
  }
}

const StatefulSingleCampus = withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleCampus))


export default StatefulSingleCampus
