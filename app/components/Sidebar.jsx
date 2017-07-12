import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Sidebar () {
  return (
    <sidebar>
      <div className="sidebar-header">
        <h5>
          <Link to="/">Hogwarts School of Witchcraft and Wizardry</Link>
        </h5>
      </div>
      <section>
        <h3>
         <Link to="/campuses">Houses</Link>
        </h3>
      </section>
      <section>
        <h3>
         <Link to="/students">Students</Link>
        </h3>
      </section>
    </sidebar>
  );
}

export default withRouter(Sidebar);
