import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { putCampus } from '../reducers';

function EditCampus(props){
  console.log(props)
  const campus = props.campuses.find(elem => elem.id === props.currentCampusId)
  const campusStudents = props.students.filter(elem => elem.campusId === props.currentCampusId);
  if (campus) {
    return (
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
      </form>
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
    }
  }
}

const EditCampusContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(EditCampus));

export default EditCampusContainer;
