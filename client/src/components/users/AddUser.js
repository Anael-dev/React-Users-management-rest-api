import React from "react";
import { useState, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import usersDAL from "../../utils/usersAPI";
import "../../styles/AddUser.css";

const AddUser = ({ toggleAddUser, history }) => {
  const { dispatch, state } = useContext(GlobalContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: { city: "", street: "", zipcode: "" },
  });
  const [error, setError] = useState([]);

  const addNewUser = async (e) => {
    e.preventDefault();
    if (!user.name || !user.email) {
      setError("user details are required");
      return;
    }
    if (user.name.trim().indexOf(" ") === -1) {
      setError("please enter a full name");
      return;
    }
    let num;
    if (state.users.length > 0) {
      // num = Number(state.users[state.users.length[ - 1]].id) + 1;
      num = Number(state.users[0].id) + 1;
    } else {
      num = 1;
    }
    try {
      const newUser = await usersDAL.addUser({
        ...user,
        id: num,
        avatar: `https://i.pravatar.cc/150?img=${num}`,
      });
      dispatch({
        type: "ADD_USER",
        payload: newUser,
      });
      dispatch({
        type: "SHOW_SNACK_BAR",
        payload: "New user created!",
      });
      toggleAddUser();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      className='container-new-item data-collector'
      onSubmit={(e) => addNewUser(e)}>
      <label>
        Full Name:
        <input
          type='text'
          placeholder="type user's name"
          required
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type='email'
          placeholder="type user's valid email"
          required
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </label>
      {error && <label className='label-error'>{error}</label>}
      <div className='button-group-add'>
        <input
          className='btn btn-white btn-cancel'
          type='button'
          value='cancel'
          onClick={() => toggleAddUser()}
        />
        <input className='btn btn-white btn-add' type='submit' value='add' />
      </div>
    </form>
  );
};
export default AddUser;
