import React, { useState, useEffect, useContext, useCallback } from "react";
import GlobalContext from "../../context/GlobalContext";
import TodosTabContext from "../../context/TodosTabContext";
import { useRouteMatch } from "react-router-dom";
import "../../styles/Tab.css";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

import AddTodo from "./AddTodo";
import Todos from "./Todos";

const TodosTab = (props) => {
  const { state } = useContext(GlobalContext);
  let { params } = useRouteMatch();

  const [userItems, setUserItems] = useState([]);
  const [id, setId] = useState("");
  const [dialog, setDialog] = useState(false);
  const [editItem, setEditItem] = useState("");
  const [userExists, setUserExists] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (userExists) {
      const user = state.users.find((user) => user.id === Number(params.id));
      setUserName(user.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userExists, params.id]);

  const checkUser = useCallback(() => {
    const selectedId = Number(params.id);
    if (
      !state.users.some((user) => user.id === selectedId) ||
      state.users.length === 0
    ) {
      setUserExists(false);
      props.history.push("/users");
    } else {
      setUserExists(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, state.users]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const openTab = useCallback(() => {
    setId(Number(params.id));
    setDialog(false);
    setEditItem("");
  }, [params.id]);

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

  useEffect(() => {
    if (!dialog) {
      setEditItem("");
    }
  }, [dialog]);

  const toggleDialog = () => {
    setDialog(!dialog);
  };

  const AddEditItem = (item) => {
    setEditItem(item);
    toggleDialog();
  };

  const redirectBack = () => {
    props.history.goBack();
  };

  return (
    <TodosTabContext.Provider
      value={{
        userItems,
        id,
        toggleDialog,
        editItem,
        InsertEditItem: (item) => AddEditItem(item),
      }}>
      <>
        {userExists && (
          <div className='user-data'>
            <div className='user-title'>
              <button
                type='buton'
                className='btn label-link back'
                onClick={() => redirectBack()}>
                <i className='fas fa-chevron-left'></i>
                <span>Back</span>
              </button>
              <h2 className='title-header'>
                <i className='fas fa-clipboard-list icon blue-num'></i>
                {userName} to-do's
              </h2>
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
          </div>
        )}
      </>
    </TodosTabContext.Provider>
  );
};

export default TodosTab;
