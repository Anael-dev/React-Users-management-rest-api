import React, { useContext, useState, useCallback, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import TabContext from "../../context/TabContext";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "../../styles/ListItems.css";
import todosDAL from "../../utils/todosAPI";
import moment from "moment";

const Todo = ({ item }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { InsertEditItem } = useContext(TabContext);
  const [checked, setChecked] = useState(item.completed);
  // const [openSelect, setOpenSelect] = useState(false);
  // const [action, setAction] = useState("");

  // const handleSelectAction = (e) => {
  //   setAction(e.target.value);
  // };

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
    [checked]
  );

  useEffect(() => {
    checkTodo(item);
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
        <>
          <Checkbox
            checked={checked}
            onChange={() => completeTask(item)}
            // disabled={checked}
          />
          {/* Complete
            <button
              title='completed'
              className='btn btn-icon btn-action complete'
              type='button'
              onClick={() => completeTask(item)}>
              <i className='fas fa-check'></i>
            </button> */}
        </>
      </td>
      <td style={{ minWidth: "100px" }}>
        {/* <button
          type='button'
          className='btn'
          onClick={() => setOpenSelect(true)}>
          <i className='fas fa-ellipsis-h'></i>
        </button>
        <FormControl>
          <Select
            disableUnderline={true}
            labelId='open-select-label'
            id='open-select'
            open={openSelect}
            onClose={() => setOpenSelect(false)}
            onOpen={() => setOpenSelect(true)}
            onChange={(e) => handleSelectAction(e)}>
            <MenuItem value={"delete"}>
              <button
                type='button'
                className='btn btn-icon btn-action'
                onClick={() => deleteTask(item._id)}>
                <i className='far fa-trash-alt'></i>
              </button>
            </MenuItem>
            <MenuItem value={"edit"}>
              <button type='button' className='btn btn-icon btn-action'>
                <i className='fas fa-pencil-alt'></i>
              </button>
            </MenuItem>
          </Select>
        </FormControl> */}
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
