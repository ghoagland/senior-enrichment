import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addStudent } from '../reducers';

function NewStudent(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label>Create a new student</label>
        <input
          className="form-control"
          type="text"
          name="studentName"
          placeholder="Enter student name"
        />
        <input
          className="form-control"
          type="text"
          name="studentEmail"
          placeholder="Enter student email"
        />

        <select name="campusSelect" defaultValue={null}>
          {props.campuses.map(campus => {
            return (
              <option key={campus.id}>{campus.name}</option>
            )
          })}
        </select>

      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-default">Create Student</button>
      </div>
    </form>
  )
}


//connect to store
function mapStateToProps(state) {
  return {
    campuses: state.campuses
  }
}

function mapDispatchToProps (dispatch) {
  return {
    handleSubmit(event) {
      event.preventDefault();
      const name = event.target.studentName.value;
      const email = event.target.studentEmail.value;
      const campusName = event.target.campusSelect.value;
      dispatch(addStudent({ name, email, campusName }))
      event.target.studentName.value = '';
      event.target.studentEmail.value = '';
      event.target.campusSelect.value = null;
    }
  }
}

const NewStudentContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(NewStudent));

export default NewStudentContainer;
