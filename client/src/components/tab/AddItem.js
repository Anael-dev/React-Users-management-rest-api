import React, { useState, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import TabContext from "../../context/TabContext";
import projectsDAL from "../../utils/projectsAPI";
import todosDAL from "../../utils/todosAPI";

import "../../styles/AddItem.css";
import users from "../../context/reducers/users";

const AddItem = () => {
  const { dispatch } = useContext(GlobalContext);
  const { type, id, toggleAdd } = useContext(TabContext);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const addItem = async (e) => {
    e.preventDefault();
    if (type === "todos") {
      if (!title) {
        setError("please type a valid to-do");
        return;
      }
      let newTodo = {
        userId: id,
        title,
        completed: false,
      };
      try {
        const newTodoResponse = await todosDAL.addTodo(newTodo);
        dispatch({
          type: "ADD_TODO",
          payload: newTodoResponse,
        });
        dispatch({
          type: "SHOW_SNACK_BAR",
          payload: "New todo added!",
        });
        toggleAdd();
      } catch (err) {
        console.log(err);
      }
    } else {
      if (!title || !body) {
        setError("please type valid project details");
        return;
      }
      let newProject = {
        title,
        body,
        users: [...users, { id: id }],
      };
      try {
        const newProjectResponse = await projectsDAL.addProject(newProject);
        dispatch({
          type: "ADD_PROJECT",
          payload: newProjectResponse,
        });
        dispatch({
          type: "SHOW_SNACK_BAR",
          payload: "New project added!",
        });
        toggleAdd();
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className='container-new-item'>
      <h3>New {type === "projects" ? "Project" : "To-do"}</h3>
      <form className='data-collector' onSubmit={(e) => addItem(e)}>
        <label>
          {type === "projects" ? "Title:" : "Task:"}
          <input
            type='text'
            placeholder={`What's your ${
              type === "projects" ? "project title?" : "new task?"
            }
            `}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        {type === "projects" && (
          <>
            <br />
            <label>
              Content:
              <textarea
                className='project-content'
                onChange={(e) => setBody(e.target.value)}></textarea>
            </label>
          </>
        )}
        {error && <label className='label-error error-item'>{error}</label>}
        <div className='button-group-add'>
          <input type='submit' className='btn btn-white btn-add' value='add' />
          <input
            type='button'
            className='btn btn-white btn-add'
            value='cancel'
            onClick={() => toggleAdd()}
          />
        </div>
      </form>
    </div>
  );
};
export default AddItem;
