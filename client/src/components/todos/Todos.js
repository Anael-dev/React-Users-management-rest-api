/* eslint-disable react-hooks/exhaustive-deps */

import React, { useContext, useState, useEffect, useMemo } from "react";
import TodosTabContext from "../../context/TodosTabContext";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "../../styles/ListItems.css";

import Todo from "./Todo";

const useSortableData = (items, id, data = null) => {
  const [sortData, setSortData] = useState(data);

  useEffect(() => {
    setSortData(null);
  }, [id]);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortData !== null) {
      sortableItems.sort((a, b) => {
        let first = a[sortData.key];
        let second = b[sortData.key];
        if (sortData.key === "title") {
          first = first.toLowerCase();
          second = second.toLowerCase();
        }
        if (first < second) {
          return sortData.direction === "ascending" ? -1 : 1;
        }
        if (first > second) {
          return sortData.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortData]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortData &&
      sortData.key === key &&
      sortData.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortData({ key, direction });
  };

  return { items: sortedItems, requestSort, sortData };
};

const Todos = () => {
  const { userItems, id, toggleDialog } = useContext(TodosTabContext);
  const [checked, setChecked] = useState(false);
  const [notCompleted, setNotCompleted] = useState([]);
  const { items, requestSort, sortData } = useSortableData(
    checked ? notCompleted : userItems,
    id
  );

  const getDirection = (name) => {
    if (!sortData) {
      return userItems.length > 0 ? (
        <i className='fas fa-sort chevron'></i>
      ) : null;
    }
    if (sortData.key === name) {
      return sortData.direction === "ascending" ? (
        <i className='fas fa-sort-up'></i>
      ) : (
        <i className='fas fa-sort-down'></i>
      );
    } else {
      return null;
    }
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    if (userItems.length > 0) {
      const mappedTodos = userItems.filter((x) => !x.completed);
      setNotCompleted([...mappedTodos]);
    }
  }, [userItems]);

  useEffect(() => {
    if (checked) {
      setChecked(false);
    }
  }, [id]);

  return (
    <>
      {userItems.length > 0 && notCompleted.length !== userItems.length && (
        <>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={(e) => handleChange(e)}
                color='primary'
              />
            }
            label='Hide completed'
          />
        </>
      )}
      {userItems.length > 0 ? (
        <div className='list-container'>
          <table className='content-table'>
            <thead>
              <tr>
                <th>
                  <button type='button' onClick={() => requestSort("title")}>
                    <span>Name</span> {getDirection("title")}
                  </button>
                </th>
                <th>
                  <button
                    type='button'
                    onClick={() => requestSort("projectId")}>
                    <span>Project</span> {getDirection("projectId")}
                  </button>
                </th>
                <th>
                  <button type='button' onClick={() => requestSort("priority")}>
                    <span>Priority</span> {getDirection("priority")}
                  </button>
                </th>
                <th>
                  <button type='button' onClick={() => requestSort("dueDate")}>
                    <span>Due Date</span> {getDirection("dueDate")}
                  </button>
                </th>
                <th>
                  <button
                    type='button'
                    onClick={() => requestSort("completed")}>
                    <span>Completed</span> {getDirection("completed")}
                  </button>
                </th>
                <th>
                  <button
                    className='btn btn-icon btn-add-item'
                    type='button'
                    title={`add task`}
                    onClick={() => toggleDialog()}>
                    <i className='fas fa-plus'> </i>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                return <Todo key={item._id} item={item} />;
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='no-todos'>
          <h3>
            No tasks to show <i className='fas fa-heart-broken icon'></i>
          </h3>

          <button
            className='btn btn-no-todos'
            type='button'
            title={`add task`}
            onClick={() => toggleDialog()}>
            <i className='fas fa-plus'> </i>
            <span>New task</span>
          </button>
        </div>
      )}
    </>
  );
};
export default Todos;
