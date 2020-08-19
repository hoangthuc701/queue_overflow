import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../../../components/Loading';

const Profile = () => {
  const userInfo = useSelector((state) => state.user_info.user_info);
  const getting = useSelector((state) => state.user_info.getting);
  const [infoDisplay, setInfoDisplay] = useState(<Loading />);
  useEffect(() => {
    if (getting) setInfoDisplay(<Loading />);
    else
      setInfoDisplay(
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
      );
  }, [getting, userInfo]);

  return (
    <div className="tab-pane active" role="tabpanel" id="menu1">
      {infoDisplay}
    </div>
  );
};

export default Profile;
