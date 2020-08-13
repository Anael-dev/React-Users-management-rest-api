import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import TodosTabContext from "../../context/TodosTabContext";
import todosDAL from "../../utils/todosAPI";
import { KeyboardDatePicker } from "@material-ui/pickers";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

import "../../styles/AddTodo.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 200,
  },
  helperText: {
    color: "#da9432",
    fontSize: ".8em",
    fontFamily: '"Lora", "serif"',
  },
}));

const AddTodo = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(GlobalContext);
  const { id, toggleDialog, editItem} = useContext(
    TodosTabContext
  );
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [priority, setPriority] = useState("Normal");
  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    setProjects(
      state.projects.filter((x) => x.users.some((user) => user.id === id))
    );
    // eslint-disable-next-line
  }, [state.projects]);

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title);
      setSelectedDate(editItem.dueDate);
      setPriority(editItem.priority);
      setProjectId(editItem.projectId);
    }
    // eslint-disable-next-line
  }, []);

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleProjectChange = (event) => {
    setProjectId(event.target.value);
  };

  const saveItem = async (e) => {
    e.preventDefault();

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
      projectId,
    };
    if (editItem) {
      try {
        const newTodoResponse = await todosDAL.editTodo(editItem._id, {
          ...newTodo,
          completed: editItem.completed,
        });
        dispatch({
          type: "EDIT_TODO",
          payload: newTodoResponse,
        });
        dispatch({
          type: "SHOW_SNACK_BAR",
          payload:"Todo updated!",
        });
        toggleDialog();
      } catch (err) {
        console.log(err);
      }
    } else {
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
        toggleDialog();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <form
      className='container-new-item data-collector'
      onSubmit={(e) => saveItem(e)}>
      <label>
        <span className='title-span'>Task:</span>
        <input
          type='text'
          placeholder="What's your new task?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
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
      <br />
      <label>
        <span className='title-span'>Assign to project:</span>
        <FormControl className={classes.formControl}>
          <Select
            labelId='project-select-label'
            id='project-select'
            value={projectId}
            disabled={!projects.length}
            onChange={(e) => handleProjectChange(e)}>
            {projects.length > 0 &&
              projects.map((project) => {
                return (
                  <MenuItem key={project._id} value={project._id}>
                    {project.title}
                  </MenuItem>
                );
              })}
          </Select>
          {!projects.length && (
            <FormHelperText className={classes.helperText}>
              No assigned projects yet
            </FormHelperText>
          )}
        </FormControl>
      </label>
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
          onChange={(date) => setSelectedDate(date)}
        />
      </label>
      <br />
      {error && <label className='label-error error-item'>{error}</label>}
      <div className='button-group-add'>
        <input
          type='button'
          className='btn btn-white btn-cancel'
          value='cancel'
          onClick={() => toggleDialog()}
        />
        <input
          type='submit'
          className='btn btn-white btn-add'
          value={editItem ? "update" : "add"}
        />
      </div>
    </form>
  );
};
export default AddTodo;
