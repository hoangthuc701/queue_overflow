import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import UserService from '../../../../services/userService';
import ImageService from '../../../../services/imageService';
import { getUser } from '../../../../helper/auth';
import profileSettingAction from '../../../../actions/profileSetting';
import createNewValidator from '../../../../validators/setting';

const Setting = () => {
  const [user, setUser] = useState({});
  const [image, setImage] = useState();
  const [previewImageURL, setPreviewImageURL] = useState(
    // eslint-disable-next-line no-underscore-dangle
    `${process.env.REACT_APP_SERVER_DOMAIN}/upload/${getUser()._id}`
  );
  const [errors, setErrors] = useState({});
  const [canSubmit, setCanSubmit] = useState(false);
  const [needFetchData, setNeedFetchData] = useState(false);
  const dispatch = useDispatch();
  const handleOnChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
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
  const handleImageSelected = (event) => {
    if (event.target.files.length === 0) {
      return;
    }
    const img = event.target.files[0];
    const imgUrl = URL.createObjectURL(img);

    setImage(img);
    setPreviewImageURL(imgUrl);
  };

  const handleSubmit = () => {
    if (image)
      ImageService.uploadAvatar(image).then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
          setNeedFetchData(true);
        }
      });
    // eslint-disable-next-line no-underscore-dangle
    const displayName = user.displayName || user.displayName;
    const description = user.description || user.description;
    const newPassword = user.newPassword || user.newPassword;
    const isAllNull = (displayName || description || newPassword) === undefined;
    if (isAllNull) return;
    UserService.updateInfo(displayName, description, newPassword).then(
      (data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(data.message);
          setNeedFetchData(true);
        }
      }
    );
  };

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    const userId = getUser()._id;
    if (needFetchData) {
      dispatch(profileSettingAction.getUserInfo(userId));
      setNeedFetchData(false);
    }
  }, [needFetchData, dispatch]);

  useEffect(() => {
    const valuesOfUser = Object.values(user);
    setCanSubmit(checkSubmitValidation(user));
    if (valuesOfUser.every((value) => value === undefined || value === '')) {
      setCanSubmit(false);
    }
    if (image) setCanSubmit(true);
  }, [user, image]);

  return (
    <div className="tab-pane" role="tabpanel" id="menu4">
      <div className="row">
        <div className="col-4 ">
          <img
            className="avatar rounded-circle"
            src={previewImageURL}
            alt="avatar"
          />
          <form>
            <input
              type="file"
              className="custom-file-input"
              id="image"
              name="avatar"
              accept=".png,.jpg,.gif,.jpeg"
              hidden
              onChange={handleImageSelected}
            />
          </form>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            type="button"
            style={{ marginLeft: '1em' }}
            className="btn btn-lg btn-primary"
            htmlFor="image"
          >
            Change Avatar
          </label>
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
              />
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
