import React, { useContext, useEffect, useState } from "react";
import UsersContext from "../../context/UsersContext";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../styles/Users.css";

import User from "../user-profile/User";

const Users = () => {
  const { state } = useContext(UsersContext);
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    if (state.filteredUsers) {
      setFiltered(state.filteredUsers);
    }
  }, [state.filteredUsers]);

  return (
    <div className='container-users'>
      <div className='users-header'>
        <h2 className='users-title'>User Profile</h2>
        <Link className='add-link' to={"/users/add_user"}>
          <button className='btn-user' type='button' title='add user'>
            <i className='fas fa-user-plus'> </i>
          </button>
        </Link>
      </div>
      <div className='users-section'>
        {filtered.length === 0 && <p>No users found :(</p>}
        <TransitionGroup>
          {filtered.length > 0 &&
            filtered.map((x) => {
              return (
                <CSSTransition key={x._id} timeout={500} classNames='item'>
                  <User key={x._id} userData={x} />
                </CSSTransition>
              );
            })}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default React.memo(Users);
