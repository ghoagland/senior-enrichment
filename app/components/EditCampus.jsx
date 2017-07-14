import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { putCampus, destroyCampus, removeCampusFromStudent } from '../store';

function EditCampus(props){
  const campus = props.campuses.find(elem => elem.id === props.currentCampusId)
  const currentCampusStudents = props.students.filter(elem => elem.campusId === props.currentCampusId);
  if (campus) {
    return (
      <div>
        <form onSubmit={props.handleSubmit}>
          <div className="form-group">
            <label>Edit {campus.name}</label>
            <input
              className="form-control"
              type="text"
              name="campusName"
              defaultValue={campus.name}
            />
            <input
              className="form-control"
              type="text"
              name="campusImage"
              defaultValue={campus.image}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-default">Submit</button>
          </div>
          <div className="form-group">
            <button onClick={props.handleCampusClick} type="button" className="btn btn-danger"><Link to='/'>Delete Campus</Link></button>
          </div>
        </form>
        <hr></hr>
        <label>{campus.name} students</label>
        <ul>
          {currentCampusStudents.map(student => {
            return (
              <li key={student.id}>
                {`${student.name}  `}
                <button onClick={event => props.handleStudentClick(event, student)}className="btn btn-xs" style={{'borderRadius':'50%'}}>x</button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  } else {
    return (<h1>Campus not found</h1>)
  }
}

//connect to store
function mapStateToProps (state, ownProps) {
  const campusId = +ownProps.match.params.campusId;
  return {
    currentCampusId: campusId,
    campuses: state.campuses,
    students: state.students
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    handleSubmit(event) {
      event.preventDefault();
      const id = +ownProps.match.params.campusId;
      const name = event.target.campusName.value;
      const image = event.target.campusImage.value;
      dispatch(putCampus({ name, image, id }))
    },

    handleCampusClick(event) {
      event.preventDefault();
      const id = +ownProps.match.params.campusId;
      dispatch(destroyCampus(id))
    },

    handleStudentClick (event, student) {
      event.preventDefault();
      dispatch(removeCampusFromStudent(student));
    }
  }
}

const EditCampusContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(EditCampus));

export default EditCampusContainer;
