import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { putStudent, destroyStudent } from '../reducers';

function EditStudent(props){

  const student = props.students.find(elem => elem.id === props.currentStudentId)
  //const campus = props.campuses.find(elem => elem.id === student.campusId);
  if (student) {
    return (
      <form onSubmit={props.handleSubmit}>
        <div className="form-group">
          <label>Edit {student.name}</label>
          <input
            className="form-control"
            type="text"
            name="studentName"
            defaultValue={student.name}
          />
          <input
            className="form-control"
            type="text"
            name="studentEmail"
            defaultValue={student.email}
          />
          <select name="campusSelect">
          {props.campuses.map(singleCampus => {
            return (
              <option key={singleCampus.id}>{singleCampus.name}</option>
            )
          })}
        </select>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-default">Submit</button>
        </div>
        <div className="form-group">
          <button onClick={props.handleClick} type="button" className="btn btn-danger"><Link to='/'>Delete Student</Link></button>
        </div>
      </form>
    )
  } else {
    return (<h1>Student not found</h1>)
  }
}

//connect to store
function mapStateToProps (state, ownProps) {
  const studentId = +ownProps.match.params.studentId;
  return {
    currentStudentId: studentId,
    campuses: state.campuses,
    students: state.students
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    handleSubmit(event) {
      event.preventDefault();
      const id = +ownProps.match.params.studentId;
      const name = event.target.studentName.value;
      const email = event.target.studentEmail.value;
      const campusName = event.target.campusSelect.value
      dispatch(putStudent({ name, email, id, campusName }))
    },
    handleClick(event) {
      event.preventDefault()
      const id = +ownProps.match.params.studentId;
      dispatch(destroyStudent(id))
    }
  }
}

const EditStudentContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(EditStudent));

export default EditStudentContainer;
