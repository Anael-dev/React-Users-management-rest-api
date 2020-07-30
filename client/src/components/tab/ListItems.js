import React, { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import TabContext from "../../context/TabContext";
import "../styles/ListItems.css";
import todosDAL from "../../utils/todosAPI";

const ListItems = () => {
  const { dispatch } = useContext(GlobalContext);

  const completeTask = async (item) => {
    try {
      const updatedTodo = await todosDAL.editTodo(item._id, {
        ...item,
        completed: true,
      });
      dispatch({
        type: "COMPLETE_TODO",
        payload: updatedTodo,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TabContext.Consumer>
      {(context) => (
        <div className='list-container'>
          <ul className='list-items'>
            {context.userItems.map((item) => {
              return (
                <li key={item._id}>
                  <div
                    className={`item ${
                      context.type === "posts" ? "item-post" : "item-todo"
                    } ${item.completed ? "completed-item" : ""}`}>
                    <label className='item-label'>
                      <strong>Title: </strong>
                      <span className={item.completed ? "completed-title" : ""}>
                        {item.title}
                      </span>
                    </label>
                    <p className='item-label'>
                      {context.type === "posts" ? (
                        <>
                          <strong>Body: </strong>
                          {item.body}
                        </>
                      ) : (
                        <>
                          <strong>Completed: </strong>
                          {item.completed.toString()}
                        </>
                      )}
                      {context.type === "todos" && !item.completed && (
                        <input
                          className='btn btn-completed'
                          type='button'
                          value='Completed'
                          onClick={() => completeTask(item)}
                        />
                      )}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </TabContext.Consumer>
  );
};
export default ListItems;
