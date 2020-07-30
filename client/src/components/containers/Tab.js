import React, { useState, useEffect, useContext, useCallback } from "react";
import GlobalContext from "../../context/GlobalContext";
import TabContext from "../../context/TabContext";
import "../../styles/Tab.css";

import AddItem from "../tab/AddItem";
import Todos from "../tab/Todos";
import Projects from "../tab/Projects";

const Tab = (props) => {
  const { state } = useContext(GlobalContext);
  const [userItems, setUserItems] = useState([]);
  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [addItem, setItem] = useState(false);

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

        {!addItem && (
          <button
            className='btn btn-grey btn-icon add'
            type='button'
            onClick={() => toggleAddItem()}>
            <i className='fas fa-plus'></i>
          </button>
        )}
      </div>
      {addItem && <AddItem />}
      <div className={`items ${addItem ? "hidden-list" : ""}`}>
        {type === "todos" && <Todos />}
        {type === "projects" && <Projects />}
      </div>
    </TabContext.Provider>
  );
};

export default Tab;
