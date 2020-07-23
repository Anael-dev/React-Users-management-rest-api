/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useState, useEffect } from "react";
import TabContext from "../../context/TabContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "../../styles/ListItems.css";

import Todo from "./Todo";

const Todos = () => {
  const { userItems, id } = useContext(TabContext);
  const [checked, setChecked] = useState(false);
  const [notCompleted, setNotCompleted] = useState([]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    if (userItems.length > 0) {
      const mappedTodos = userItems.filter((x) => !x.completed);
      setNotCompleted([...mappedTodos]);
    }
  }, [userItems]);

  useEffect(() => {
    if (checked) {
      setChecked(false);
    }
  }, [id]);

  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={(e) => handleChange(e)}
            color='primary'
          />
        }
        label='Hide completed'
      />
      <br />
      <div className='list-container'>
        <ul className='list-items'>
          <TransitionGroup>
            {(checked ? notCompleted : userItems).map((item) => {
              return (
                <CSSTransition key={item._id} timeout={500} classNames='item'>
                  <Todo key={item._id} item={item} />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </ul>
      </div>
    </>
  );
};
export default Todos;
