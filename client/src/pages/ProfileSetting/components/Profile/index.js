import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user_info = useSelector((state) => state.user_info.user_info);
  return (
    <div className="tab-pane active" role="tabpanel" id="menu1">
      <div className="row">
        <div className="col-4">
          <img
            className="avatar"
            src="https://static.vecteezy.com/system/resources/previews/000/241/070/non_2x/flat-boy-with-vintage-glasses-avatar-vector-illustration.jpg"
            alt="avatar"
          />
        </div>
        <div className="col-8 mt-5">
          <h2>{user_info.display_name}</h2>
          <h5>{user_info.description}</h5>
          <h2>{user_info.email}</h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
