import React, { useContext } from "react";
import UsersContext from "../../context/UsersContext";
import MainPageContext from "../../context/MainPageContext";

import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../styles/Users.css";

import User from "../user-profile/User";

const Users = ({ isAccordion }) => {
  const { state } = useContext(UsersContext);
  const { closeAccordion } = useContext(MainPageContext);

  return (
    <div
      className={`container-users ${isAccordion ? "accordion-container" : ""}`}
      id='container-left'>
      <div className='users-header'>
        {!isAccordion && <h3 className='users-title'>All Profiles</h3>}
        <Link className='add-link' to={"/users/add_user"}>
          <button
            className='btn-user'
            type='button'
            title='add user'
            onClick={() => closeAccordion()}>
            <i className='fas fa-user-plus'> </i>
          </button>
        </Link>
      </div>
      <div className='users-section'>
        {state.filteredUsers.length === 0 && <p>No users found :(</p>}
        <TransitionGroup>
          {state.filteredUsers.length > 0 &&
            state.filteredUsers.map((x) => {
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
