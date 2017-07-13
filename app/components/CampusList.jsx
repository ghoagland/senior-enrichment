import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'

function CampusList(props) {
  return (
    <div>
      <section>
        <h3>Hogwarts Houses:</h3>
        <ul>
          {props.campuses.map(campus => {
            return (
              <li key={campus.id}>
                <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}


//connecting to store

const mapStateToProps = function(state) {
  return {
    campuses: state.campuses
  }
}

const StatefulCampusList = withRouter(connect(mapStateToProps)(CampusList))

export default StatefulCampusList;
