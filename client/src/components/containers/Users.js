import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../styles/Users.css";

import User from "../user/User";
import AddUser from "../user/AddUser";

const Users = ({ isAccordion }) => {
  const { state } = useContext(GlobalContext);
  const [addUser, setAddUser] = useState(false);

  // useEffect(() => {
  //   setAddUser(false);
  // }, []);

  const toggleAddUser = () => {
    setAddUser(!addUser);
  };

  return (
    <div
      className={`container-users ${isAccordion ? "accordion-container" : ""}`}
      id='container-left'>
      <div className='users-header'>
        {!isAccordion && <h3 className='users-title'>All Profiles</h3>}
        <button
          className='btn btn-user'
          type='button'
          title='add user'
          onClick={() => {
            toggleAddUser();
          }}>
          <i className='fas fa-user-plus'></i>
        </button>
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
      <Dialog
        open={addUser}
        aria-labelledby='form-dialog-title'
        onClose={toggleAddUser}>
        <DialogTitle disableTypography id='form-dialog-title' className='add-title'>
          <h3>Add New User</h3>
        </DialogTitle>
        <AddUser toggleAddUser={() => toggleAddUser()} />
      </Dialog>
    </div>
  );
};

export default React.memo(Users);
