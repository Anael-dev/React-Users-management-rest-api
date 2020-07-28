import React from "react";
import { useState } from "react";

const Benefit = ({ src, type }) => {
  const [benefits] = useState({
    users: {
      title: "Manage Users",
      description:
        "Search users by name or email, add and delete users, update profile details",
    },
    todos: {
      title: "Complete To-do’s",
      description:
        "Create and delete tasks, complete done to-do’s, track users’ task achievements",
    },
    posts: {
      title: "Write Posts",
      description:
        "Add new posts, create and delete chosen posts, receive inspiration by others’ fresh content",
    },
  });

  return (
    <div className='benefit'>
      <div className='icon-main'>
        <img className='icon-img' src={src} alt='users' />
        <h3>{benefits[type].title}</h3>
      </div>
      <p className='description'>{benefits[type].description}</p>
    </div>
  );
};
export default Benefit;
