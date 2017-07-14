import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import store, { putCampus, destroyCampus, removeCampusFromStudent, getCampus } from '../store';

class EditCampus extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCampusClick = this.handleCampusClick.bind(this);
    this.handleStudentClick = this.handleStudentClick.bind(this);
  }

  componentDidMount () {
    this.props.loadCampus();
  }

  render () {
    const campus = this.props.campuses.find(elem => elem.id === this.props.currentCampusId)
    const currentCampusStudents = this.props.students.filter(elem => elem.campusId === this.props.currentCampusId);
    if (campus) {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
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
              <button onClick={this.handleCampusClick} type="button" className="btn btn-danger"><Link to='/'>Delete Campus</Link></button>
            </div>
          </form>
          <hr></hr>
          <label>{campus.name} students</label>
          <ul>
            {currentCampusStudents.map(student => {
              return (
                <li key={student.id}>
                  {`${student.name}  `}
                  <button onClick={event => this.handleStudentClick(event, student)}className="btn btn-xs" style={{'borderRadius':'50%'}}>x</button>
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

  handleSubmit(event) {
    event.preventDefault();
    const id = +this.props.match.params.campusId;
    const name = event.target.campusName.value;
    const image = event.target.campusImage.value;
    this.props.editCampus({ name, image, id })
  }

  handleCampusClick(event) {
    event.preventDefault();
    const id = +this.props.match.params.campusId;
    this.props.deleteCampus(id);
  }

  handleStudentClick (event, student) {
    event.preventDefault();
    this.props.removeStudent(student);
  }
}

//connect to store
function mapStateToProps (state, ownProps) {
  const campusId = +ownProps.match.params.campusId;
  return {
    currentCampusId: state.campusReducer.currentCampusId,
    campuses: state.campusReducer.campuses,
    students: state.studentReducer.students
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    editCampus(campus) {
      dispatch(putCampus(campus))
    },

    deleteCampus(id) {
      dispatch(destroyCampus(id))
    },

    removeStudent (student) {
      dispatch(removeCampusFromStudent(student));
    },
    loadCampus () {
      dispatch(getCampus(+ownProps.match.params.campusId))
    }
  }
}

const EditCampusContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(EditCampus));

export default EditCampusContainer;
