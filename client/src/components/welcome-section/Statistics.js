import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

import Chart from "./Chart";

const Statistics = ({ width, completedUsers, mostProjects}) => {
  const { state } = useContext(GlobalContext);

  return (
    <section className='statistics' id='container-statistics'>
      <h3 className='users-num'>
        <i className='fas fa-angle-double-left arrow-left'></i>
        Total Users:<span className='blue-num'>{state.users.length || 0}</span>
        <i className='fas fa-angle-double-right arrow-right'></i>
      </h3>
      {completedUsers.length > 0 ? (
        <div className='chart'>
          <Chart usersData={completedUsers} type='todos' viewWidth={width} />
        </div>
      ) : (
        <p>No completed tasks yet</p>
      )}
      {/* {mostProjects.length > 0 ? (
        <div className='chart doughnut'>
          <Chart usersData={mostProjects} type='projects' viewWidth={width} />
        </div>
      ) : (
        <p>No assigned users for projects</p>
      )} */}
    </section>
  );
};

export default Statistics;
