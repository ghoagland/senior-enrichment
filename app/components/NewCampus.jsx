import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addCampus } from '../reducers';

class NewCampus extends Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
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
  handleSubmit (event) {
    event.preventDefault();
    const name = event.target.campusName.value;
    const image = event.target.campusImage.value;
    this.props.newCampus({ name, image })
    event.target.campusName.value = '';
    event.target.campusImage.value = '';
  }
}

//connect to store


function mapDispatchToProps (dispatch) {
  return {
    newCampus(campus) {
      dispatch(addCampus(campus));
    }
  }
}

const NewCampusContainer = withRouter(connect(null, mapDispatchToProps)(NewCampus));
export default NewCampusContainer;
