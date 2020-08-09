import React, { useState, useEffect, useContext, useCallback } from "react";
import GlobalContext from "../../context/GlobalContext";
import TabContext from "../../context/TabContext";
import "../../styles/Tab.css";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

import AddTodo from "../todos/AddTodo";
import Todos from "../todos/Todos";

const Tab = (props) => {
  const { state } = useContext(GlobalContext);
  const [userItems, setUserItems] = useState([]);
  const [id, setId] = useState("");
  const [dialog, setDialog] = useState(false);
  const [editItem, setEditItem] = useState("");

  const openTab = useCallback(() => {
    setId(Number(props.id));
    setDialog(false);
    setEditItem("");
  }, [props.id]);

  useEffect(() => {
    openTab();
  }, [openTab]);

  const setItems = useCallback(() => {
    let selectedTab = state.todos;
    const filteredItems = selectedTab.filter((todo) => todo.userId === id);

    if (filteredItems !== userItems) {
      setUserItems(filteredItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, state.todos]);

  useEffect(() => {
    setItems();
  }, [setItems]);

  const toggleDialog = () => {
    setDialog(!dialog);
  };

  const AddEditItem = (item) => {
    setEditItem(item);
    toggleDialog();
  };

  const cancelAction = () => {
    setEditItem("");
    toggleDialog();
  };

  return (
    <TabContext.Provider
      value={{
        userItems,
        id,
        toggleDialog,
        editItem,
        InsertEditItem: (item) => AddEditItem(item),
        cancelAction,
      }}>
      <div className='data-header'>
        <h3 className='title-header'>
          <span className='icon'>
            <i className='far fa-calendar-plus'></i>
          </span>
          to-do's
        </h3>
      </div>

      <Dialog
        open={dialog}
        onClose={toggleDialog}
        aria-labelledby='form-dialog-title'>
        <DialogTitle
          disableTypography
          id='form-dialog-title'
          className='add-title'>
          <h3>
            {editItem ? "Edit " : "Add "}
            To-do
          </h3>
        </DialogTitle>
        <AddTodo />
      </Dialog>
      <div className='items'>
        <Todos />
      </div>
    </TabContext.Provider>
  );
};

export default Tab;
