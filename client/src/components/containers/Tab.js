import React, { useState, useEffect, useContext, useCallback } from "react";
import UsersContext from "../../context/UsersContext";
import TabContext from "../../context/TabContext";
import "../../styles/Tab.css";

import AddItem from "../tab/AddItem";
import Todos from "../tab/Todos";
import Posts from "../tab/Posts";

const Tab = (props) => {
  const { state } = useContext(UsersContext);
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
    selectedTab = type === "posts" ? state.posts : state.todos;
    const filteredItems = selectedTab.filter((x) => x.userId === id);
    if (filteredItems !== userItems) {
      setUserItems(filteredItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, state.posts, state.todos, type]);

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
            {type === "posts" && <i className='far fa-clipboard'></i>}
            {type === "todos" && <i className='far fa-calendar-plus'></i>}
          </span>
          {type}
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
        {type === "posts" && <Posts />}
      </div>
    </TabContext.Provider>
  );
};

export default Tab;
