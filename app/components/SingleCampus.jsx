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
  const campusId = Number(ownProps.match.params.campusId);
  console.log("in mapStatetoprops", state, 'campusId', campusId)
  return {
    students: state.students,
    campuses: state.campuses,
    currentCampusId: campusId

  }
}

const mapDispatchToProps = function(dispatch, ownProps) {
  //const campusId = Number(ownProps.match.params.campusId);
  return {
    getCampus(campusId) {
      dispatch(getCampus(campusId));
    }
  }
}

const StatefulSingleCampus = withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleCampus))


export default StatefulSingleCampus
