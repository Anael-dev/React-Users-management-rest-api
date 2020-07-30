import React, { useState, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import TabContext from "../../context/TabContext";
import postsDAL from "../../utils/postsAPI";
import todosDAL from "../../utils/todosAPI";

import "../../styles/AddItem.css";

const AddItem = () => {
  const { dispatch } = useContext(
    GlobalContext
  );
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
        setError("please type valid post details");
        return;
      }
      let newPost = {
        userId: id,
        title,
        body,
      };
      try {
        const newPostResponse = await postsDAL.addPost(newPost);
        dispatch({
          type: "ADD_POST",
          payload: newPostResponse,
        });
        dispatch({
          type: "SHOW_SNACK_BAR",
          payload: "New post added!",
        });
        toggleAdd();
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className='container-new-item'>
      <h3>New {type === "posts" ? "Post" : "To-do"}</h3>
      <form className='data-collector' onSubmit={(e) => addItem(e)}>
        <label>
          {type === "posts" ? "Title:" : "Task:"}
          <input
            type='text'
            placeholder={`What's your ${
              type === "posts" ? "post title?" : "new task?"
            }
            `}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        {type === "posts" && (
          <>
            <br />
            <label>
              Content:
              <textarea
                className='post-content'
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
