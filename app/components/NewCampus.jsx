import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { addCampus } from '../reducers';

function NewCampus (props){
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label>Create a new house</label>
        <input
          className="form-control"
          type="text"
          name="campusName"
          placeholder="Enter house name"
        />
        <input
          className="form-control"
          type="text"
          name="campusImage"
          placeholder="Image URL"
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-default">Create House</button>
      </div>
    </form>
  )
}

//connect to store


function mapDispatchToProps (dispatch) {
  return {
    handleSubmit(event) {
      event.preventDefault();
      const name = event.target.campusName.value;
      const image = event.target.campusImage.value;
      dispatch(addCampus({ name, image }))
      event.target.campusName.value = '';
      event.target.campusImage.value = '';
    }
  }
}

const NewCampusContainer = withRouter(connect(null, mapDispatchToProps)(NewCampus));
export default NewCampusContainer;
