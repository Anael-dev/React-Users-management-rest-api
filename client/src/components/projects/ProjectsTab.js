import React, { useState, useEffect, useCallback, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import ProjectsTabContext from "../../context/ProjectsTabContext";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

import AddProject from "./AddProject";
import Projects from "./Projects";
import { useRouteMatch, useHistory } from "react-router-dom";

const ProjectsTab = ({ isAccordion = false }) => {
  const history = useHistory();
  const { params } = useRouteMatch();
  const { state } = useContext(GlobalContext);

  const [dialog, setDialog] = useState(false);
  const [editItem, setEditItem] = useState("");

  const checkUser = useCallback(() => {
    const selectedId = Number(params.id);
    const projectId = Number(params.projectId);
    const project = state.projects.find((project) => project._id === projectId);
    if (!project || !project.users.some((x) => x.id === selectedId)) {
      history.push("/projects");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, params.projectId, state.projects]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const openTab = useCallback(() => {
    setDialog(false);
    setEditItem("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, params.projectId]);

  useEffect(() => {
    openTab();
  }, [openTab]);

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

  return (
    <ProjectsTabContext.Provider
      value={{
        toggleDialog,
        editItem,
        InsertEditItem: (item) => AddEditItem(item),
      }}>
      <>
        <Dialog
          open={dialog}
          aria-labelledby='form-dialog-title'
          onClose={toggleDialog}>
          <DialogTitle
            disableTypography
            id='form-dialog-title'
            className='add-title'>
            <h3> {editItem ? "Edit " : "Add "} Project</h3>
          </DialogTitle>
          <AddProject toggleAddProject={() => toggleDialog()} />
        </Dialog>
        <Projects isAccordion={isAccordion} />
      </>
    </ProjectsTabContext.Provider>
  );
};

export default ProjectsTab;
