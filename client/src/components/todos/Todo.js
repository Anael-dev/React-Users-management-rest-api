import React, { useContext, useState, useCallback, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import TodosTabContext from "../../context/TodosTabContext";
import Checkbox from "@material-ui/core/Checkbox";
import "../../styles/ListItems.css";
import todosDAL from "../../utils/todosAPI";
import moment from "moment";

const Todo = ({ item }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { InsertEditItem } = useContext(TodosTabContext);
  const [checked, setChecked] = useState(item.completed);

  const checkTodo = useCallback(
    async (item) => {
      try {
        const updatedTodo = await todosDAL.editTodo(item._id, {
          ...item,
          completed: checked,
        });
        dispatch({
          type: "COMPLETE_TODO",
          payload: updatedTodo,
        });
      } catch (err) {
        console.log(err);
      }
    },
    // eslint-disable-next-line
    [checked]
  );

  useEffect(() => {
    checkTodo(item);
    // eslint-disable-next-line
  }, [checkTodo]);

  const completeTask = async () => {
    setChecked(!checked);
  };

  const deleteTask = async (id) => {
    try {
      await todosDAL.deleteTodo(id);
      dispatch({
        type: "DELETE_TODO",
        payload: item,
      });
      dispatch({
        type: "SHOW_SNACK_BAR",
        payload: "Todo deleted successfully",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <tr key={item._id} className={item.completed ? "completed-tr" : ""}>
      <td>{item.title}</td>
      <td>
        {item.projectId
          ? state.projects.find((project) => project._id === item.projectId)
              .title
          : ""}
      </td>
      <td>
        {item.priority ? (
          <div title={item.priority}>
            <i className={`fab fa-font-awesome-flag ${item.priority}`}></i>
          </div>
        ) : (
          ""
        )}
      </td>
      <td>{item.dueDate ? moment(item.dueDate).format("DD/MM/YYYY") : ""}</td>
      <td>
        <Checkbox
          style={{
            color: "rgb(79, 122, 14)",
          }}
          checked={checked}
          onChange={() => completeTask(item)}
        />
      </td>
      <td style={{ minWidth: "100px" }}>
        <button
          type='button'
          className='btn btn-icon btn-action'
          onClick={() => InsertEditItem(item)}>
          <i className='fas fa-pencil-alt'></i>
        </button>
        <button
          type='button'
          className='btn btn-icon btn-action'
          onClick={() => deleteTask(item._id)}>
          <i className='far fa-trash-alt'></i>
        </button>
      </td>
    </tr>
  );
};

export default Todo;
