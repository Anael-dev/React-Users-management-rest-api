import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import TabContext from "../../context/TabContext";
import projectsDAL from "../../utils/projectsAPI";
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";

import "../../styles/AddTodo.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 250,
    maxWidth: 250,
  },
}));

const AddProject = ({ editItem = null, toggleAddProject }) => {
  const classes = useStyles();
  const { state, dispatch } = useContext(GlobalContext);
  //   const { toggleDialog, editItem, cancelAction } = useContext(TabContext);

  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
    getContentAnchorEl: null,
  };
  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title);
      setSelectedDate(editItem.dueDate);
      setUsers([...editItem.users]);
    }
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
    console.log(newProject);
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
      toggleAddProject();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className='container-new-item data-collector'
      onSubmit={(e) => saveItem(e)}>
      <label>
        <span className='title-span'>Title:</span>
        <input
          type='text'
          placeholder="What's your project title?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <>
        <br />
        <label>
          <span className='title-span'>Assign Users:</span>
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
      </>
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
          onClick={() => toggleAddProject()}
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
