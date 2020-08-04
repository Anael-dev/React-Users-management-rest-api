import React, { useState, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import TabContext from "../../context/TabContext";
import projectsDAL from "../../utils/projectsAPI";
import todosDAL from "../../utils/todosAPI";
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

import "../../styles/AddItem.css";
import users from "../../context/reducers/users";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 120,
  },
}));

const AddItem = () => {
  const classes = useStyles();
  const { dispatch } = useContext(GlobalContext);
  const { type, id, toggleAdd } = useContext(TabContext);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [selectedDate, handleDateChange] = useState(new Date());
  const [priority, setPriority] = React.useState("Normal");

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

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
        dueDate: selectedDate,
        priority,
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
    <form
      className='container-new-item data-collector'
      onSubmit={(e) => addItem(e)}>
      <label>
        <span className='title-span'>
          {type === "projects" ? "Title:" : "Task:"}
        </span>
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
            <span className='title-span'>Description:</span>
            <textarea
              className='project-content'
              onChange={(e) => setBody(e.target.value)}></textarea>
          </label>
        </>
      )}
      {type === "todos" && (
        <>
          <br />
          <label>
            <span className='title-span'>Priority:</span>
            <FormControl className={classes.formControl}>
              <Select
                labelId='priority-select-label'
                id='priority-select'
                value={priority}
                onChange={(e) => handlePriorityChange(e)}>
                <MenuItem value={"Urgent"}>Urgent</MenuItem>
                <MenuItem value={"Normal"}>Normal</MenuItem>
                <MenuItem value={"Low"}>Low</MenuItem>
              </Select>
            </FormControl>
          </label>
        </>
      )}
      <br />
      <label>
        <span className='title-span \'>Due Date:</span>
        <KeyboardDatePicker
          autoOk
          variant='inline'
          format='DD/MM/YYYY'
          value={selectedDate}
          InputAdornmentProps={{ position: "start" }}
          InputProps={{
            disableUnderline: true,
          }}
          onChange={(date) => handleDateChange(date)}
        />
      </label>
      <br />
      {error && <label className='label-error error-item'>{error}</label>}
      <div className='button-group-add'>
        <input
          type='button'
          className='btn btn-white btn-cancel'
          value='cancel'
          onClick={() => toggleAdd()}
        />
        <input type='submit' className='btn btn-white btn-add' value='add' />
      </div>
    </form>
  );
};
export default AddItem;
