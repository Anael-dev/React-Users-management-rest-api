import React, { useState, useEffect, useContext, useCallback } from "react";
import GlobalContext from "../../context/GlobalContext";
import TabContext from "../../context/TabContext";
import "../../styles/Tab.css";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

import AddItem from "../tab/AddItem";
import Todos from "../tab/Todos";
import Projects from "../tab/Projects";
import { orange } from "@material-ui/core/colors";

const Tab = (props) => {
  const { state } = useContext(GlobalContext);
  const [userItems, setUserItems] = useState([]);
  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [addItem, setItem] = useState(false);

  // useEffect(() => {
  //   setItem(false);
  // }, []);

  const openTab = useCallback(() => {
    setId(Number(props.id));
    setItem(false);
  }, [props.id]);

  useEffect(() => {
    openTab();
  }, [openTab]);

  const getNewType = useCallback(() => {
    setType(props.type);
  }, [props.type]);

  useEffect(() => {
    getNewType();
  }, [getNewType]);

  const setItems = useCallback(() => {
    let selectedTab;
    selectedTab = type === "projects" ? state.projects : state.todos;
    const filteredItems =
      type === "projects"
        ? selectedTab.filter((project) =>
            project.users.some((user) => user.id === id)
          )
        : selectedTab.filter((todo) => todo.userId === id);

    if (filteredItems !== userItems) {
      setUserItems(filteredItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, state.projects, state.todos, type]);

  useEffect(() => {
    setItems();
  }, [setItems]);

  const toggleAddItem = () => {
    setItem(!addItem);
  };

  return (
    <TabContext.Provider
      value={{ type, userItems, id, toggleAdd: () => toggleAddItem() }}>
      <div className='data-header'>
        <h3 className='title-header'>
          <span className='icon'>
            {type === "projects" && <i className='far fa-clipboard'></i>}
            {type === "todos" && <i className='far fa-calendar-plus'></i>}
          </span>
          {type === "todos" ? "to-do's" : type}
        </h3>
        <div>
          <button
            className='btn btn-icon btn-add-item'
            type='button'
            title={`add ${type === "projects" ? "project" : "task"}`}
            onClick={() => toggleAddItem()}>
            <i className='fas fa-plus'> </i>
          </button>
        </div>
      </div>

      <Dialog
        open={addItem}
        onClose={toggleAddItem}
        // onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <DialogTitle
          disableTypography
          id='form-dialog-title'
          className='add-title'>
          <h3>New {type === "projects" ? "Project" : "To-do"}</h3>
        </DialogTitle>
        <AddItem />
      </Dialog>
      <div className='items'>
        {type === "todos" && <Todos />}
        {type === "projects" && <Projects />}
      </div>
    </TabContext.Provider>
  );
};

export default Tab;
