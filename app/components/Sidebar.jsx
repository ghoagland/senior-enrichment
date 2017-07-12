import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Sidebar () {
  return (
    <div className='col-sm-2'>
      <sidebar>
        <section>
          <h4>
           <Link to="/campuses">Houses</Link>
          </h4>
        </section>
        <section>
          <h4>
           <Link to="/students">Students</Link>
          </h4>
        </section>
      </sidebar>
    </div>
  );
}

export default withRouter(Sidebar);
