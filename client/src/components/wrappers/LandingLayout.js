import React, { useContext, useEffect, useState } from "react";
import UsersContext from "../../context/UsersContext";
import "../../styles/LandingLayout.css";

/*icons*/
import usersIcon from "../../images/benefits/userImg.png";
import todosIcon from "../../images/benefits/tasksList.png";
import postsIcon from "../../images/benefits/postPage.png";

import Benefit from "../landing-page/Benefit";
import Chart from "../landing-page/Chart";

const LandingLayout = () => {
  const { state } = useContext(UsersContext);

  const [completedUsers, setCompletedUsers] = useState([]);
  const [bestAuthors, setBestAuthors] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    const mappedUsers = state.todosProgress
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);
    setCompletedUsers(mappedUsers);
  }, [state.todosProgress]);

  useEffect(() => {
    const mappedAuthors = state.postsProgress
      .sort((a, b) => b.posts - a.posts)
      .slice(0, 5);
    setBestAuthors(mappedAuthors);
  }, [state.postsProgress]);

  return (
    <div className='container-default'>
      <div className='top-section'>
        <div className='welcome-header'>
          <h1>
            <span className='capital-letter'>W</span>elcome!
          </h1>
        </div>
        <p className='intro-title'>In our platform you can do the following:</p>
        <div className='container-benefits'>
          <Benefit src={usersIcon} type='users' />
          <Benefit src={todosIcon} type='todos' />
          <Benefit src={postsIcon} type='posts' />
        </div>
      </div>
      <section className='statistics'>
        <h3 className='users-num'>
          <i className='fas fa-angle-double-left arrow-left'></i>
          Total Users Number:<span>{state.users.length || 0}</span>
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
    </div>
  );
};

export default React.memo(LandingLayout);
