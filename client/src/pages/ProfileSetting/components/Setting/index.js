import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import UserService from '../../../../services/userService';
import { getUser } from '../../../../helper/auth';
import profileSettingAction from '../../../../actions/profileSetting';

const Setting = () => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const handleOnChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.password !== user.confirm_password) {
      toast.error('Password and confirm password is not match');
      return;
    }
    // eslint-disable-next-line no-underscore-dangle
    const userId = getUser()._id;
    UserService.updateInfo(
      user.display_name,
      user.description,
      user.password
    ).then((data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        dispatch(profileSettingAction.getUserInfo(userId));
      }
    });
  };

  return (
    <div className="tab-pane" role="tabpanel" id="menu4">
      <div className="row">
        <div className="col-4">
          <img
            className="avatar"
            src="https://static.vecteezy.com/system/resources/previews/000/241/070/non_2x/flat-boy-with-vintage-glasses-avatar-vector-illustration.jpg"
            alt="avatar"
          />
          <button
            type="button"
            style={{ marginLeft: '2em' }}
            className="btn btn-lg btn-primary"
          >
            Change Avatar
          </button>
        </div>
        <div className="col-8 mt-5">
          <form>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="display_name">
                <h6>Display Name</h6>
              </label>
              <input
                type="text"
                className="form-control"
                name="display_name"
                id="display_name"
                aria-describedby="emailHelp"
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="description">
                <h6>Description</h6>
              </label>
              <input
                type="text"
                className="form-control"
                name="description"
                id="description"
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="password">
                <h6>New Password</h6>
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="confirm_password">
                <h6>Confirm Password</h6>
              </label>
              <input
                type="password"
                className="form-control"
                name="confirm_password"
                id="confirm_password"
                onChange={handleOnChange}
              />
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-success"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Setting;
