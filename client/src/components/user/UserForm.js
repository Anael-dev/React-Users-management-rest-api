import React, { useEffect, useState } from "react";
import "../../styles/UserForm.css";

const UserForm = ({ user, deleteUserCallback, updateUserCallback }) => {
  const [data, setData] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [action, setAction] = useState("");
  const [disable, setDisable] = useState(false);
  const [mainErrors, setMainErrors] = useState({ name: "", address: "" });
  const [addressErrors, setAddressErrors] = useState({
    street: "",
    city: "",
    zipcode: "",
  });

  useEffect(() => {
    if (user.id) {
      setData({ ...user });
    }
  }, [user]);

  const handleMainDataChange = (event) => {
    if (!event.target.value) {
      setMainErrors({
        ...mainErrors,
        [event.target.name]: `${event.target.name} is required`,
      });
    } else {
      setMainErrors({ ...mainErrors, [event.target.name]: "" });
    }
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleAddressDataChange = (event) => {
    if (!event.target.value) {
      setAddressErrors({
        ...addressErrors,
        [event.target.name]: `please enter valid ${event.target.name}`,
      });
    } else {
      setAddressErrors({ ...addressErrors, [event.target.name]: "" });
    }
    setData({
      ...data,
      address: { ...data.address, [event.target.name]: event.target.value },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDisable(true);
    if (action === "delete") {
      deleteUserCallback();
    }
    if (action === "update") {
      updateUserCallback(data);
      setTimeout(() => {
        setDisable(false);
      }, 500);
    }
    setAction("");
  };

  return (
    <div className='container-form'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Name:
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={data.name || ""}
            onChange={(e) => handleMainDataChange(e)}
          />
          {mainErrors.name && (
            <label className='label-error'>{mainErrors.name}</label>
          )}
        </label>
        <label>
          Email:
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={data.email || ""}
            required
            onChange={(e) => handleMainDataChange(e)}
          />
          {mainErrors.email && (
            <label className='label-error'>{mainErrors.email}</label>
          )}
        </label>
        <div className='button-group'>
          <input
            className='btn btn-white btn-more-data'
            type='button'
            value='Other Data'
            onClick={() => {
              setIsVisible(!isVisible);
            }}
          />
          <div className='action-buttons'>
            <button
              className='btn btn-white btn-icon  action-button'
              type='submit'
              disabled={disable}
              title='update user'
              onClick={() => setAction("update")}>
              <i className='fas fa-check'></i>
            </button>
            <button
              className='btn btn-white btn-icon  action-button'
              type='submit'
              disabled={disable}
              title='delete user'
              onClick={() => setAction("delete")}>
              <i className='fas fa-trash'></i>
            </button>
          </div>
        </div>
        {isVisible && (
          <div className='other-data'>
            <label>
              City:
              <input
                type='text'
                name='city'
                placeholder='city'
                value={data.address.city || ""}
                onChange={(e) => handleAddressDataChange(e)}
              />
              {addressErrors.city && (
                <label className='label-error'>{addressErrors.city}</label>
              )}
            </label>
            <label>
              Street:
              <input
                type='text'
                id='street'
                name='street'
                placeholder='Street'
                value={data.address.street || ""}
                onChange={(e) => handleAddressDataChange(e)}
              />
              {addressErrors.street && (
                <label className='label-error'>{addressErrors.street}</label>
              )}
            </label>
            {/* <label>
              Zip code:
              <input
                type='text'
                name='zipcode'
                placeholder='zipcode'
                value={data.address.zipcode || ""}
                onChange={(e) => handleAddressDataChange(e)}
              />
              {addressErrors.zipcode && (
                <label className='label-error'>{addressErrors.zipcode}</label>
              )}
            </label> */}
          </div>
        )}
      </form>
    </div>
  );
};

export default UserForm;
