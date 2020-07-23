import React, { useContext } from "react";
import UsersContext from "../../context/UsersContext";
import "../../styles/ListItems.css";
import todosDAL from "../../utils/todosDAL";

const Todo = ({ item }) => {
  const { dispatch } = useContext(UsersContext);

  const completeTask = async (item) => {
    try {
      const updatedTodo = await todosDAL.editTodo(item._id, {
        ...item,
        completed: true,
      });
      dispatch({
        type: "COMPLETE_TODO",
        payload: updatedTodo,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await todosDAL.deleteTodo(id);
      dispatch({
        type: "DELETE_TODO",
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li key={item._id}>
      <div
        className={`item item-todo ${item.completed ? "completed-item" : ""} `}>
        <div className='item-body'>
          <label className='item-label'>
            <strong>Task: </strong>
            <span className={item.completed ? "completed-title" : ""}>
              {item.title}
            </span>
          </label>
          <div className='item-label item-completed'>
            <span>
              <strong>Completed: </strong>
              {item.completed.toString()}
            </span>
          </div>
        </div>
        {!item.completed && (
          <button
            title='completed'
            className='btn btn-icon btn-action complete'
            type='button'
            onClick={() => completeTask(item)}>
            <i className='fas fa-check'></i>
          </button>
        )}
        <button
          type='button'
          className='btn btn-icon btn-action'
          onClick={() => deleteTask(item._id)}>
          <i className='far fa-trash-alt'></i>
        </button>
      </div>
    </li>
  );
};

export default Todo;
