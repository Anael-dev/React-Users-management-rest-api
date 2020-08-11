/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import MainPageContext from "../../context/MainPageContext";
import { animateScroll } from "react-scroll";

import "../../styles/User.css";
import usersDAL from "../../utils/usersAPI";
import todosDAL from "../../utils/todosAPI";
import projectsDAL from "../../utils/projectsAPI";
import UserForm from "./UserForm";

const User = ({ userData }) => {
  const history = useHistory();
  const { state, dispatch } = useContext(GlobalContext);
  const { closeAccordion } = useContext(MainPageContext);

  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [todos, setTodos] = useState([]);

  const [completedTodos, setCompletedTodos] = useState([]);
  const [allCompleted, setAllCompleted] = useState(false);

  const [todosPercentage, setTodosPercentage] = useState(0);
  const [statusQuote, setStatusQuote] = useState("");

  useEffect(() => {
    if (userData.id) {
      setUser({ ...userData });
    }
  }, [userData]);

  useEffect(() => {
    if (user.id) {
      setTodos([...state.todos.filter((todo) => todo.userId === user.id)]);
    }
  }, [state.todos, user]);

  useEffect(() => {
    if (user.id) {
      setProjects([
        ...state.projects.filter((project) =>
          project.users.some((x) => x.id === user.id)
        ),
      ]);
    }
  }, [state.projects, user]);

  useEffect(() => {
    if (todosPercentage > 0 && todosPercentage < 85) {
      setStatusQuote("In Progress");
    } else if (todosPercentage >= 85 && todosPercentage < 100) {
      setStatusQuote("Almost Done");
    } else {
      setStatusQuote("");
    }
    if (todosPercentage === 100) {
      setStatusQuote("Completed!");
      setAllCompleted(true);
    } else {
      setAllCompleted(false);
    }
    if (todos.length > 0) {
      dispatch({
        type: "ADD_TODOS_PROGRESS",
        payload: {
          id: user.id,
          name: user.name,
          todos: todos,
          completed: completedTodos,
          percentage: todosPercentage,
        },
      });
    }
  }, [todosPercentage]);

  useEffect(() => {
    function calcPerc(a, b) {
      let percent;
      if (b !== 0) {
        if (a !== 0) {
          percent = (a / b) * 100;
        } else {
          percent = 0;
        }
      } else {
        percent = 0;
      }
      return Math.floor(percent);
    }
    const percentage = calcPerc(completedTodos.length, todos.length);
    setTodosPercentage(percentage);
  }, [completedTodos, todos]);

  const checkPercentage = useCallback(() => {
    if (todos.length > 0) {
      let completedTodos = todos.filter((todo) => todo.completed === true);
      setCompletedTodos(completedTodos);
    } else {
      setCompletedTodos([]);
    }
  }, [todos]);

  useEffect(() => {
    checkPercentage();
  }, [checkPercentage]);

  useEffect(() => {
    if (projects.length > 0) {
      dispatch({
        type: "ADD_PROJECTS_PROGRESS",
        payload: {
          id: user.id,
          name: user.name,
          projects,
        },
      });
    }
  }, [projects]);

  const deleteUser = async (id) => {
    try {
      await usersDAL.deleteUser(id);
      await Promise.all(todos.map((todo) => todosDAL.deleteTodo(todo._id)));
      await Promise.all(
        projects.map(async (project) => {
          await projectsDAL.removeProjectUser(project._id, { id: user.id });
          dispatch({
            type: "DELETE_USER_FROM_PROJECT",
            payload: { userId: user.id, item: project },
          });
        })
      );

      dispatch({
        type: "DELETE_USER",
        payload: user,
      });
      dispatch({
        type: "SHOW_SNACK_BAR",
        payload: "User deleted successfully",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateUser = async (id, obj) => {
    try {
      const updatedUser = await usersDAL.editUser(id, obj);
      dispatch({
        type: "EDIT_USER",
        payload: updatedUser,
      });
      dispatch({
        type: "SHOW_SNACK_BAR",
        payload: "User updated successfully",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const redirectToData = () => {
    history.push(`/users/${user.id}`);
    closeAccordion();
    animateScroll.scrollToTop();
  };

  return (
    <div
      className={`container-user ${allCompleted && "completed"}`}
      id={`user-${user.id}`}>
      <div className='user-header'>
        <div className='user-details'>
          <div className='img-bar-section'>
            <img
              className='avatar-img'
              src={user.avatar}
              alt='user avatar'
              style={{ width: "4em", height: "4em" }}
              onClick={() => redirectToData()}
            />
            <div className='status-bar'>
              {todos.length > 0 && (
                <span
                  className={`status-quote ${
                    todosPercentage === 100 ? "completed-status" : ""
                  } ${
                    todosPercentage >= 85 && todosPercentage < 100
                      ? "almost-done-status"
                      : ""
                  }`}>
                  {statusQuote}
                </span>
              )}
              <div className='progress '>
                <div
                  className={`progress-bar bg-warning ${
                    todosPercentage === 100 ? "progress-done" : ""
                  } ${
                    todosPercentage >= 85 && todosPercentage < 100
                      ? "progress-almost-done"
                      : ""
                  } `}
                  role='progressbar'
                  style={{
                    width: `${todosPercentage}%`,
                  }}
                  aria-valuenow='25'
                  aria-valuemin='0'
                  aria-valuemax='100'>
                  <span>{todosPercentage}%</span>
                </div>
              </div>
              <span className='status'>
                {todos.length > 0
                  ? `${completedTodos.length} of ${todos.length}`
                  : "No tasks yet"}
              </span>
            </div>
          </div>
          <label className='label-link' onClick={() => redirectToData()}>
            {user.name}
          </label>
          <label className='label-id'>ID: {user.id}</label>
        </div>
      </div>
      <UserForm
        user={user}
        deleteUserCallback={() => {
          deleteUser(user._id);
        }}
        updateUserCallback={(userObj) => {
          updateUser(user._id, userObj);
        }}
      />
    </div>
  );
};

export default User;
