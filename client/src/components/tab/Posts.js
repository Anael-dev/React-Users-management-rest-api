import React, { useContext } from "react";
import TabContext from "../../context/TabContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../styles/ListItems.css";

import Post from "./Post";

const Posts = () => {
  const { userItems } = useContext(TabContext);

  return (
    <div className='list-container'>
      <ul className='list-items'>
        <TransitionGroup>
          {userItems.map((item) => {
            return (
              <CSSTransition key={item._id} timeout={500} classNames='item'>
                <Post key={item._id} item={item} />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </ul>
    </div>
  );
};

export default Posts;
