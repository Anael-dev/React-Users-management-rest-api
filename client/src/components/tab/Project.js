import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import "../../styles/ListItems.css";
import projectsDAL from "../../utils/projectsAPI";

const Project = ({ item }) => {
  const { dispatch } = useContext(GlobalContext);

  const [editView, setEditView] = useState(false);
  const [updatedProject, setUpdatedProject] = useState({ title: "", body: "" });

  useEffect(() => {
    if (item._id) {
      setUpdatedProject({ title: item.title, body: item.body });
    }
  }, [item]);

  const deleteProject = async (id) => {
    try {
      await projectsDAL.deleteProject(id);

      dispatch({
        type: "DELETE_PROJECT",
        payload: item,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const editProject = async (id, project) => {
    if (project.title && project.body) {
      try {
        const updatedProject = await projectsDAL.editProject(id, project);

        dispatch({
          type: "EDIT_PROJECT",
          payload: updatedProject,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      setUpdatedProject({ title: item.title, body: item.body });
    }
  };

  return (
    <li key={item._id}>
      <div className='item item-project'>
        <div className='item-body'>
          <label className='item-label project-title'>
            <strong>Title: </strong>
            {!editView ? (
              <span> {item.title}</span>
            ) : (
              <input
                type='text'
                className={!updatedProject.title ? "error-border" : ""}
                value={updatedProject.title || ""}
                name='title'
                onChange={(e) =>
                  setUpdatedProject({
                    ...updatedProject,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            )}
          </label>
          {!editView ? (
            <p className="project-body">
              <i className='fas fa-quote-left quote'></i>
              {item.body}
              <i className='fas fa-quote-right quote'></i>
            </p>
          ) : (
            <label className='item-label'>
              <strong>Body: </strong>
              <textarea
                cols='30'
                rows='5'
                className={!updatedProject.body ? "error-border" : ""}
                aria-label='With textarea'
                name='body'
                defaultValue={updatedProject.body || ""}
                onChange={(e) =>
                  setUpdatedProject({
                    ...updatedProject,
                    [e.target.name]: e.target.value,
                  })
                }></textarea>
            </label>
          )}
        </div>
        {!editView ? (
          <button
            type='button'
            className='btn btn-icon btn-action edit'
            onClick={() => setEditView(true)}>
            <i className='fas fa-pencil-alt'></i>
          </button>
        ) : (
          <button
            type='button'
            title='update'
            className='btn btn-icon btn-action edit'
            onClick={() => {
              editProject(item._id, updatedProject);
              setEditView(false);
            }}>
            <i className='fas fa-check'></i>
          </button>
        )}
        {!editView ? (
          <button
            type='button'
            className='btn btn-icon btn-action'
            onClick={() => deleteProject(item._id)}>
            <i className='far fa-trash-alt'></i>
          </button>
        ) : (
          <button
            type='button'
            title='cancel'
            className='btn btn-icon btn-action'
            onClick={() => setEditView(false)}>
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </li>
  );
};

export default Project;
