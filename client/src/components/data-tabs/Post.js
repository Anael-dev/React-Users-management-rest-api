import React, { useContext, useEffect, useState } from "react";
import UsersContext from "../../context/UsersContext";
import "../../styles/ListItems.css";
import postsDAL from "../../utils/postsDAL";

const Post = ({ item }) => {
  const { dispatch } = useContext(UsersContext);

  const [editView, setEditView] = useState(false);
  const [updatedPost, setUpdatedPost] = useState({ title: "", body: "" });

  useEffect(() => {
    if (item._id) {
      setUpdatedPost({ title: item.title, body: item.body });
    }
  }, [item]);

  const deletePost = async (id) => {
    try {
      await postsDAL.deletePost(id);

      dispatch({
        type: "DELETE_POST",
        payload: item,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const editPost = async (id, post) => {
    if (post.title && post.body) {
      try {
        const updatedPost = await postsDAL.editPost(id, post);

        dispatch({
          type: "EDIT_POST",
          payload: updatedPost,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      setUpdatedPost({ title: item.title, body: item.body });
    }
  };

  return (
    <li key={item._id}>
      <div className='item item-post'>
        <div className='item-body'>
          <label className='item-label post-title'>
            <strong>Title: </strong>
            {!editView ? (
              <span> {item.title}</span>
            ) : (
              <input
                type='text'
                className={!updatedPost.title ? "error-border" : ""}
                value={updatedPost.title || ""}
                name='title'
                onChange={(e) =>
                  setUpdatedPost({
                    ...updatedPost,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            )}
          </label>
          <br />
          {!editView ? (
            <p>
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
                className={!updatedPost.body ? "error-border" : ""}
                aria-label='With textarea'
                name='body'
                defaultValue={updatedPost.body || ""}
                onChange={(e) =>
                  setUpdatedPost({
                    ...updatedPost,
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
              editPost(item._id, updatedPost);
              setEditView(false);
            }}>
            <i className='fas fa-check'></i>
          </button>
        )}
        {!editView ? (
          <button
            type='button'
            className='btn btn-icon btn-action'
            onClick={() => deletePost(item._id)}>
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

export default Post;
