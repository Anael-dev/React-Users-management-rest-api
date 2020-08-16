import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import projectsDAL from "../../utils/projectsAPI";
import { KeyboardDatePicker } from "@material-ui/pickers";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";

import "../../styles/AddTodo.css";
import ProjectsTabContext from "../../context/ProjectsTabContext";
import todosDAL from "../../utils/todosAPI";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 150,
    maxWidth: 250,
    width: "100%",
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
  getContentAnchorEl: null,
};

const AddProject = () => {
  const classes = useStyles();

  const { state, dispatch } = useContext(GlobalContext);
  const { toggleDialog, editItem } = useContext(ProjectsTabContext);

  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedNames, setSelectedNames] = useState([]);

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title);
      setSelectedDate(editItem.dueDate);
      setSelectedNames([
        ...editItem.users.map(
          (x) => state.users.find((user) => user.id === x.id).name
        ),
      ]);
    }
    // eslint-disable-next-line
  }, []);

  const handleUsersChange = (event) => {
    setSelectedNames(event.target.value);
  };

  const saveItem = async (e) => {
    e.preventDefault();
    if (!title) {
      setError("please type valid project details");
      return;
    }
    if (selectedNames.length === 0) {
      setError("please assign at least one user");
      return;
    }
    let newProject = {
      title,
      dueDate: selectedDate,
      users: selectedNames.map((x) => {
        return { id: state.users.find((user) => user.name === x).id };
      }),
    };
    if (editItem) {
      try {
        let result = editItem.users.every((x) =>
          newProject.users.some((user) => user.id === x.id)
        );
        if (!result || editItem.users.length !== newProject.users.length) {
          const removedUsers = editItem.users.filter(
            (x) => !newProject.users.some((user) => user.id === x.id)
          );
          // console.log(removedUsers);

          if (removedUsers.length > 0) {
            let projectTodos;
            removedUsers.forEach((user) => {
              projectTodos = state.todos.filter(
                (todo) =>
                  todo.userId === user.id && todo.projectId === editItem._id
              );
            });
            if (projectTodos.length > 0) {
              await Promise.all(
                projectTodos.map(async (todo) => {
                  await todosDAL.deleteTodo(todo._id);
                  dispatch({
                    type: "DELETE_TODO",
                    payload: todo,
                  });
                })
              );
            }
          }
        }
        const updatedProject = await projectsDAL.editProject(
          editItem._id,
          newProject
        );
        dispatch({
          type: "EDIT_PROJECT",
          payload: updatedProject,
        });
        dispatch({
          type: "SHOW_SNACK_BAR",
          payload: "Project updated!",
        });
        toggleDialog();
      } catch (err) {
        console.log(err);
      }
    } else {
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
      <label className='form-input'>
        <span className='form-title'>Title:</span>
        <input
          type='text'
          placeholder='Type a project title'
          value={title}
          className='form-input'
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label className='form-input'>
        <span className='form-title'>
          Assigned Users: {selectedNames.length}
        </span>
        <FormControl className={classes.formControl}>
          <Select
            labelId='priority-select-label'
            id='priority-select'
            multiple
            value={selectedNames}
            onChange={(e) => handleUsersChange(e)}
            input={<Input />}
            MenuProps={MenuProps}>
            {state.users.map((x) => (
              <MenuItem key={x.id} value={x.name}>
                {x.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </label>
      <label className='form-input'>
        <span className='form-title'>Due Date:</span>
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
export default AddProject;
