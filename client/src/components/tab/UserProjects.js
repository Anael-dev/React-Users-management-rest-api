import React, { useContext } from "react";
import TabContext from "../../context/TabContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../styles/ListItems.css";

import Project from "./UserProject";

const Projects = () => {
  const { userItems, id } = useContext(TabContext);

  return (
    <div className='list-container'>
      <ul className='list-items'>
        <TransitionGroup>
          {userItems.map((item) => {
            return (
              <CSSTransition key={item._id} timeout={500} classNames='item'>
                <Project key={item._id} item={item} userId={id} />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </ul>
    </div>
  );
};

export default Projects;
