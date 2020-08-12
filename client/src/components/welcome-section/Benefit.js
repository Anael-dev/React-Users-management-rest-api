import React from "react";
import { useState } from "react";

const Benefit = ({ src, type }) => {
  const [benefits] = useState({
    users: {
      title: "Manage Users",
      description:
        "Search users by name or email, update profile details, track progress",
    },
    todos: {
      title: "Complete To-do’s",
      description:
        "Create and sort tasks, complete todo’s, assign tasks to projects",
    },
    projects: {
      title: "Add Projects",
      description:
        "Add new projects, assign users to projects and follow completion",
    },
  });

  return (
    <div className='benefit'>
      <div className='icon-main'>
        <img className='icon-img' src={src} alt='users' />
        <h3>
          <span className='first-word'>
            {benefits[type].title.split(" ")[0]}
          </span>
          <nobr>{benefits[type].title.split(" ")[1]}</nobr>
        </h3>
      </div>
      <p className='description'>{benefits[type].description}</p>
    </div>
  );
};
export default Benefit;
