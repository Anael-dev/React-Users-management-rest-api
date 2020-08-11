/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext} from "react";
import { useHistory } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import MainPageContext from "../../context/MainPageContext";
import { animateScroll } from "react-scroll";
import moment from "moment";

import "../../styles/Project.css";
import todosDAL from "../../utils/todosAPI";
import projectsDAL from "../../utils/projectsAPI";
import ProjectsTabContext from "../../context/ProjectsTabContext";

const Project = ({ projectData }) => {
  const history = useHistory();
  const { closeAccordion } = useContext(MainPageContext);
  const { state, dispatch } = useContext(GlobalContext);
  const { InsertEditItem } = useContext(ProjectsTabContext);

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
        todos.map(async (todo) => {
          if (todo.projectId === project._id) {
            await todosDAL.deleteTodo(todo._id);
            dispatch({
              type: "DELETE_TODO",
              payload: todo,
            });
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

  const redirectToData = (id) => {
    history.push(`/projects/user/${id}`);
    closeAccordion();
    animateScroll.scrollToTop();
  };

  return (
    <div className={`container-project`} id={`project-${project._id}`}>
      <div className='project-details'>
        <div className='project-header'>
          <div className='header-details'>
            <label className='label-project-title'>{project.title}</label>
            <div>
              {project.users &&
                project.users.map((x) => (
                  <img
                    key={x.id}
                    className='avatar-img'
                    src={state.users.find((user) => user.id === x.id).avatar}
                    alt='user avatar'
                    style={{
                      width: "2em",
                      height: "2em",
                      marginRight: ".8em",
                    }}
                    title={state.users.find((user) => user.id === x.id).name}
                    onClick={() => redirectToData(x.id)}
                  />
                ))}
            </div>
          </div>
          <label>
            <i className='far fa-calendar project-icon'></i>
            {/* Due date: */}
            {project.dueDate
              ? moment(project.dueDate).format("DD/MM/YYYY")
              : ""}
          </label>
        </div>
        <div className='project-content'>
          <div className='project-labels'>
            <label className='label-project'>
              Assigned Users:{" "}
              <span className='span-num'>
                {project.users && project.users.length}
              </span>
            </label>
            <label className='label-project'>
              Total Tasks: <span className='span-num'>{todos.length}</span>
            </label>
            <label className='label-project'>
              Completed:{" "}
              <span className='span-num'>
                {" "}
                {todos.filter((x) => x.completed).length}
              </span>
            </label>
          </div>
          <div className='project-buttons'>
            <button
              className='btn btn-white btn-icon action-button'
              type='button'
              title='edit project'
              onClick={() => InsertEditItem(projectData)}>
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
        </div>
      </div>
    </div>
  );
};

export default Project;
