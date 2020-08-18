import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const userInfo = useSelector((state) => state.user_info.user_info);
  return (
    <div className="tab-pane active" role="tabpanel" id="menu1">
      <div className="row">
        <div className="col-4">
          <img
            className="avatar"
            src={`${process.env.REACT_APP_SERVER_DOMAIN}/upload/${
              // eslint-disable-next-line no-underscore-dangle
              userInfo._id
            }?${Date.now()}`}
            alt="avatar"
          />
        </div>
        <div className="col-8 mt-5">
          <h2>{userInfo.display_name}</h2>
          <h5>{userInfo.description}</h5>
          <h2>{userInfo.email}</h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
