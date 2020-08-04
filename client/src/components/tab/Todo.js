import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import "../../styles/ListItems.css";
import todosDAL from "../../utils/todosAPI";
const moment = require("moment");

const Todo = ({ item }) => {
  const { dispatch } = useContext(GlobalContext);

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
        payload: item,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <tr key={item._id} className={item.completed ? "completed-tr" : ""}>
      <td>{item.title}</td>
      <td>{item.project ? item.project : "-"}</td>
      <td>{item.priority ? item.priority : "-"}</td>
      <td>{item.dueDate ? moment(item.dueDate).format("DD/MM/YYYY") : "-"}</td>
      <td>
        {item.completed.toString()}
        {!item.completed && (
          <button
            title='completed'
            className='btn btn-icon btn-action complete'
            type='button'
            onClick={() => completeTask(item)}>
            <i className='fas fa-check'></i>
          </button>
        )}
      </td>
      <td>
        <button
          type='button'
          className='btn btn-icon btn-action'
          onClick={() => deleteTask(item._id)}>
          <i className='far fa-trash-alt'></i>
        </button>
      </td>

      {/* <li key={item._id}>
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
          {item.dueDate && (
            <div className='item-date'>
              <label className='item-label'>
                <strong>Due Date: </strong>
                {moment(item.dueDate).format("DD/MM/YYYY")}
              </label>
            </div>
          )}
          {item.priority && (
            <div className='item-priority'>
              <label className='item-label'>
                <strong>Priority: </strong>
                {item.priority}
              </label>
            </div>
          )}
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
    </li> */}
    </tr>
  );
};

export default Todo;
