/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import MainPageContext from "../../context/MainPageContext";
import { animateScroll } from "react-scroll";
import moment from "moment";

import "../../styles/User.css";
import todosDAL from "../../utils/todosAPI";
import projectsDAL from "../../utils/projectsAPI";

const Project = ({ projectData }) => {
  const history = useHistory();
  const { state, dispatch } = useContext(GlobalContext);
  const { closeAccordion } = useContext(MainPageContext);

  const [project, setProject] = useState({});
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (projectData._id) {
      setProject({ ...projectData });
    }
  }, [projectData]);

  useEffect(() => {
    if (project._id) {
      setTodos([
        ...state.todos.filter((todo) => todo.projectId === project._id),
      ]);
    }
  }, [state.todos, project]);

  const deleteProject = async () => {
    try {
      await projectsDAL.deleteProject(project._id);
      await Promise.all(
        todos.map((todo) => {
          if (todo.projectId === project._id) {
            todosDAL.deleteTodo(todo._id);
          }
          return todo;
        })
      );
      dispatch({
        type: "DELETE_PROJECT",
        payload: project,
      });
      dispatch({
        type: "SHOW_SNACK_BAR",
        payload: "Project deleted successfully",
      });
    } catch (err) {
      console.log(err);
    }
  };

  //after update
  const editProject = async (id, project) => {
    try {
      const updatedProject = await projectsDAL.editProject(id, project);

      dispatch({
        type: "EDIT_PROJECT",
        payload: updatedProject,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const redirectToData = () => {
    history.push(`/projects/${project._id}`);
    closeAccordion();
    animateScroll.scrollToTop();
  };

  return (
    <div className={`container-user`} id={`project-${project._id}`}>
      <div className='user-header'>
        <div className='user-details'>
          <label> Name:</label>
          <label className='label-link' onClick={() => redirectToData()}>
            {project.title}
          </label>
          <label>
            Due date:{" "}
            {project.dueDate
              ? moment(project.dueDate).format("DD/MM/YYYY")
              : ""}
          </label>
          <label>Assigned Users: {project.users && project.users.length}</label>
          <label>Total Tasks: {todos.length}</label>
          <label>Completed: {todos.filter((x) => x.completed).length}</label>
        </div>
      </div>
      <div className='action-buttons'>
        <button
          className='btn btn-white btn-icon action-button'
          type='button'
          title='update project'
          onClick={() => deleteProject()}>
          <i className='fas fa-pencil-alt'></i>
        </button>
        <button
          className='btn btn-white btn-icon action-button'
          type='button'
          title='delete project'
          onClick={() => deleteProject()}>
          <i className='fas fa-trash'></i>
        </button>
      </div>
      {/* <UserForm
        user={user}
        deleteUserCallback={() => {
          deleteUser(user._id);
        }}
        updateUserCallback={(userObj) => {
          updateUser(user._id, userObj);
        }}
      /> */}
    </div>
  );
};

export default Project;
