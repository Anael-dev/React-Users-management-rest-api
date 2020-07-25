import React, { useContext } from "react";
import UsersContext from "../../context/UsersContext";

import Chart from "./Chart";

const Statistics = ({ width, completedUsers, bestAuthors }) => {
  const { state } = useContext(UsersContext);

  return (
    <section className='statistics' id='container-statistics'>
      <h3 className='users-num'>
        <i className='fas fa-angle-double-left arrow-left'></i>
        Total Users:<span className="blue-num">{state.users.length || 0}</span>
        <i className='fas fa-angle-double-right arrow-right'></i>
      </h3>
      {completedUsers.length > 0 && (
        <div className='chart'>
          <Chart usersData={completedUsers} type='todos' viewWidth={width} />
        </div>
      )}
      {bestAuthors.length > 0 && (
        <div className='chart doughnut'>
          <Chart usersData={bestAuthors} type='posts' viewWidth={width} />
        </div>
      )}
    </section>
  );
};

export default Statistics;
