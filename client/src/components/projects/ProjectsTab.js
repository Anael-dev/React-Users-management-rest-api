import React, { useState, useEffect, useCallback } from "react";
import ProjectsTabContext from "../../context/ProjectsTabContext";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

import AddProject from "./AddProject";
import Projects from "./Projects";

const ProjectsTab = ({ isAccordion = false }) => {
  const [dialog, setDialog] = useState(false);
  const [editItem, setEditItem] = useState("");

  const openTab = useCallback(() => {
    setDialog(false);
    setEditItem("");
  }, []);

  useEffect(() => {
    openTab();
  }, [openTab]);

  const toggleDialog = () => {
    setDialog(!dialog);
  };

  const AddEditItem = (item) => {
    setEditItem(item);
    toggleDialog();
  };

  const cancelAction = () => {
    setEditItem("");
    toggleDialog();
  };

  return (
    <ProjectsTabContext.Provider
      value={{
        toggleDialog,
        editItem,
        InsertEditItem: (item) => AddEditItem(item),
        cancelAction,
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
