import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import store, { addStudent, fetchCampuses } from '../reducers';

class NewStudent extends Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.loadCampuses();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
            {this.props.campuses.map(campus => {
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

  handleSubmit(event) {
      event.preventDefault();
      const name = event.target.studentName.value;
      const email = event.target.studentEmail.value;
      const campusName = event.target.campusSelect.value;
      this.props.newStudent({name, email, campusName})
      event.target.studentName.value = '';
      event.target.studentEmail.value = '';
      event.target.campusSelect.value = null;
    }
}


//connect to store
function mapStateToProps(state) {
  return {
    campuses: state.campusReducer.campuses
  }
}

function mapDispatchToProps (dispatch) {
  return {
    newStudent(student) {
      dispatch(addStudent(student))
    },
    loadCampuses() {
      dispatch(fetchCampuses());
    }
  }
}

const NewStudentContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(NewStudent));

export default NewStudentContainer;
