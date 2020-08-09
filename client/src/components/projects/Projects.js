import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../styles/Users.css";
import LeftHeader from "../layout/LeftHeader";
import Project from "./Project";
import AddProject from "./AddProject";

const Projects = ({ isAccordion = false }) => {
  const { state } = useContext(GlobalContext);
  const [addProject, setAddProject] = useState(false);

  useEffect(() => {
    setAddProject(false);
  }, []);

  const toggleAddProject = () => {
    setAddProject(!addProject);
  };

  return (
    <div
      className={`left-wrapper ${isAccordion ? "accordion-container" : ""}`}
      id='container-left'>
      <LeftHeader type='project' callBack={() => toggleAddProject()} />
      <div className='main-section'>
        {state.projects.length === 0 && <p>No projects found :(</p>}
        <TransitionGroup>
          {state.projects.length > 0 &&
            state.projects.map((x,i) => {
              return (
                <CSSTransition key={i} timeout={500} classNames='item'>
                  <Project key={i} projectData={x} />
                </CSSTransition>
              );
            })}
        </TransitionGroup>
      </div>
      <Dialog
        open={addProject}
        aria-labelledby='form-dialog-title'
        onClose={toggleAddProject}>
        <DialogTitle
          disableTypography
          id='form-dialog-title'
          className='add-title'>
          <h3>Add New Project</h3>
        </DialogTitle>
        <AddProject toggleAddProject={() => toggleAddProject()} />
      </Dialog>
    </div>
  );
};

export default Projects;
