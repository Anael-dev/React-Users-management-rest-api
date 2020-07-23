/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import UsersContext from "../../context/UsersContext";
import "../../styles/User.css";
import * as Scroll from "react-scroll";
import usersDAL from "../../utils/usersDAL";
import todosDAL from "../../utils/todosDAL";
import postsDAL from "../../utils/postsDAL";
import UserForm from "./UserForm";

const User = ({ userData }) => {
  const ScrollLink = Scroll.Link;
  const history = useHistory();
  const { state, dispatch } = useContext(UsersContext);

  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
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
  }, [state.todos]);

  useEffect(() => {
    if (user.id) {
      setPosts([...state.posts.filter((post) => post.userId === user.id)]);
    }
  }, [state.posts]);

  useEffect(() => {
    if (100 > todosPercentage > 0) {
      setStatusQuote("In Progress");
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
          todos: todos.length,
          completed: completedTodos.length,
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
  }, [completedTodos, todos.length]);

  const checkPercentage = useCallback(() => {
    if (user) {
      let completedTodos = todos.filter((todo) => todo.completed === true);
      setCompletedTodos(completedTodos);
    }
  }, [todos]);

  useEffect(() => {
    if (posts.length > 0) {
      dispatch({
        type: "ADD_POSTS_PROGRESS",
        payload: {
          id: user.id,
          name: user.name,
          posts: posts.length,
        },
      });
    }
  }, [posts]);

  useEffect(() => {
    checkPercentage();
  }, [checkPercentage]);

  const deleteUser = async (id) => {
    try {
      await usersDAL.deleteUser(id);
      await Promise.all(todos.map((todo) => todosDAL.deleteTodo(todo._id)));
      // todos.forEach(async (todo) => await todosDAL.deleteTodo(todo._id));
      await Promise.all(posts.map((post) => postsDAL.deletePost(post._id)));
      // posts.forEach(async (post) => await postsDAL.deletePost(post._id));

      dispatch({
        type: "DELETE_USER",
        payload: user,
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
    } catch (err) {
      console.log(err);
    }
  };

  const redirectToData = () => {
    history.push(`/users/user/${user.id}`);
  };

  return (
    <div
      className={`container-user ${allCompleted && "completed"}`}
      id={`user-${user.id}`}>
      <div className='user-header'>
        <div className='user-details'>
          <div className='img-bar-section'>
            <ScrollLink
              activeClass='active'
              to={"container-right"}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}>
              <img
                className={`avatar-img`}
                src={`https://i.pravatar.cc/150?img=${user.id}`}
                alt='user avatar'
                onClick={() => redirectToData()}
              />
            </ScrollLink>
            <div className='status-bar'>
              {todos.length > 0 && (
                <span
                  className='status-quote'
                  style={{
                    color: `${
                      todosPercentage === 100 ? " rgb(79, 122, 14)" : "#da9432"
                    }`,
                  }}>
                  {statusQuote}
                </span>
              )}
              <div className='progress '>
                <div
                  className={`progress-bar bg-warning ${
                    todosPercentage === 100 ? "progress-done" : ""
                  }`}
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
                  : "no todos"}
              </span>
            </div>
          </div>
          <ScrollLink
            activeClass='active'
            to='container-right'
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}>
            <label className='label-link' onClick={() => redirectToData()}>
              {user.name}
            </label>
          </ScrollLink>
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
