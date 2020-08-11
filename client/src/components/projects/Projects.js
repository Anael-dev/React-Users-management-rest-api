import React, {  useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../styles/Users.css";
import LeftHeader from "../layout/LeftHeader";
import Project from "./Project";
import ProjectsTabContext from "../../context/ProjectsTabContext";

const Projects = ({ isAccordion = false }) => {
  const { state } = useContext(GlobalContext);
  const { toggleDialog } = useContext(ProjectsTabContext);

  return (
    <div
      className={`left-wrapper ${isAccordion ? "accordion-container" : ""}`}
      id='container-projects'>
      <LeftHeader type='project' callBack={() => toggleDialog()} />
      <div className='main-section'>
        {state.projects.length === 0 && <p>No projects found</p>}
        <TransitionGroup>
          {state.projects.length > 0 &&
            state.projects.map((x, i) => {
              return (
                <CSSTransition key={i} timeout={500} classNames='item'>
                  <Project key={i} projectData={x} />
                </CSSTransition>
              );
            })}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default Projects;
