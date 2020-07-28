import React from "react";
import { useState} from "react";

const Benefit = ({ src, type }) => {
  
  const [benefits] = useState({
    users: {
      title: "Manage Users",
      description:
        "Search users by name or email, Add and delete users, update profile details",
    },
    todos: {
      title: "Complete Todos",
      description:
        "Create and delete tasks, complete done todos, track users' tasks achievement",
    },
    posts: {
      title: "Write Posts",
      description:
        "Add new posts, edit or delete chosen posts, get inspiration by others fresh content",
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
