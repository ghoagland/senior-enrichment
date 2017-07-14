import React, { Component }from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { putStudent, destroyStudent, getStudent } from '../reducers';
import store from '../store';

class EditStudent extends Component {

  componentDidMount () {
    this.props.loadStudent();
  }

  render () {
    const student = this.props.students.find(elem => elem.id === this.props.currentStudentId)
    if (student) {
      return (
        <form onSubmit={this.props.handleSubmit}>
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
            {this.props.campuses.map(singleCampus => {
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
            <button onClick={this.props.handleClick} type="button" className="btn btn-danger"><Link to='/'>Delete Student</Link></button>
          </div>
        </form>
      )
    } else {
      return (<h1>Student not found</h1>)
    }
  }
}

//connect to store
function mapStateToProps (state, ownProps) {
  const studentId = +ownProps.match.params.studentId;
  return {
    currentStudentId: state.studentReducer.currentStudentId,
    campuses: state.campusReducer.campuses,
    students: state.studentReducer.students
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
    },
    loadStudent() {
      dispatch(getStudent(+ownProps.match.params.studentId))
    }
  }
}

const EditStudentContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(EditStudent));

export default EditStudentContainer;
