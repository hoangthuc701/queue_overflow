import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import UserService from '../../../../services/userService';
import { getUser } from '../../../../helper/auth';
import profileSettingAction from '../../../../actions/profileSetting';
import createNewValidator from '../../../../validators/setting';

const Setting = () => {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);
  const dispatch = useDispatch();
  const handleOnChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    // eslint-disable-next-line no-underscore-dangle
    const userId = getUser()._id;
    const displayName = user.displayName || user.displayName;
    const description = user.description || user.description;
    const newPassword = user.newPassword || user.newPassword;
    UserService.updateInfo(displayName, description, newPassword).then(
      (data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
          dispatch(profileSettingAction.getUserInfo(userId));
        }
      }
    );
  };

  useEffect(() => {
    const checkSubmitValidation = ({
      displayName,
      description,
      newPassword,
      confirmPassword,
    }) => {
      const error = createNewValidator(
        displayName,
        description,
        newPassword,
        confirmPassword
      );
      setErrors(error);
      if (Object.keys(error).length > 0) return false;
      return true;
    };

    const valuesOfUser = Object.values(user);
    setCanSubmit(checkSubmitValidation(user));
    if (valuesOfUser.every((value) => value === undefined || value === '')) {
      setCanSubmit(false);
    }
  }, [user]);

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
              <label htmlFor="displayName">
                <h6>Display Name</h6>
              </label>
              <input
                type="text"
                className="form-control"
                name="displayName"
                id="displayName"
                aria-describedby="emailHelp"
                onChange={handleOnChange}
              />
              {errors && errors.displayName && (
                <span style={{ color: 'red' }}> {errors.displayName} </span>
              )}
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
              />{' '}
              {errors && errors.description && (
                <span style={{ color: 'red' }}> {errors.description} </span>
              )}
            </div>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="newPassword">
                <h6>New Password</h6>
              </label>
              <input
                type="password"
                className="form-control"
                name="newPassword"
                id="newPassword"
                onChange={handleOnChange}
              />{' '}
              {errors && errors.newPassword && (
                <span style={{ color: 'red' }}> {errors.newPassword} </span>
              )}
            </div>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="confirmPassword">
                <h6>Confirm Password</h6>
              </label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                id="confirmPassword"
                onChange={handleOnChange}
              />{' '}
              {errors && errors.confirmPassword && (
                <span style={{ color: 'red' }}> {errors.confirmPassword} </span>
              )}
            </div>
            <button
              onClick={handleSubmit}
              type="button"
              className="btn btn-success"
              disabled={!canSubmit}
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
