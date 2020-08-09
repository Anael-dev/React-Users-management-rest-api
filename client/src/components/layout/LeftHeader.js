import React, { useState, useEffect, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../styles/Users.css";

const LeftHeader = ({ type, callBack }) => {
  return (
    <div className='container-header'>
      <button
        className='btn btn-user'
        type='button'
        title={`add ${type}`}
        onClick={() => callBack()}>
        <i className='fas fa-user-plus'></i>
        <span>New {type}</span>
      </button>
    </div>
  );
};

export default LeftHeader;
