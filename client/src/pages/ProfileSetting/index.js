import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import Profile from './components/Profile';
import QuestionManagement from './components/QuestionManagement';
import Setting from './components/Setting';
import userActions from '../../actions/profileSetting';
import { getUser } from '../../helper/auth';
import './index.css';

const ProfileSetting = () => {
  const dispatch = useDispatch();
  const [onlyProfile, setOnlyProfile] = useState(false);
  const [redirect, setRedirect] = useState();
  let { userId } = useParams();

  useEffect(() => {
    const user = getUser();
    // eslint-disable-next-line no-underscore-dangle
    const id = user._id;
    if (!userId) {
      if (!user) {
        setRedirect('/signin');
        return;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      userId = id;
      // eslint-disable-next-line no-underscore-dangle
    } else if (userId !== user._id) {
      setOnlyProfile(true);
    } else {
      setOnlyProfile(false);
    }
    setRedirect(false);
    const userInfo = async () => {
      // eslint-disable-next-line no-use-before-define
      const isSuccess = await dispatch(userActions.getUserInfo(userId));
      if (isSuccess) {
        setRedirect();
      } else {
        setRedirect('/');
      }
    };
    userInfo();
  }, []);

  const renderMenu = () => {
    if (onlyProfile)
      return (
        <>
          <div className="tab-content">
            <Profile />
          </div>
        </>
      );
    return (
      <>
        <ul className="nav nav-pills nav-fill navtop">
          <li className="nav-item">
            <a className="nav-link active" href="#menu1" data-toggle="tab">
              Profile
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#menu2" data-toggle="tab">
              Manage Question
            </a>
          </li>
          {/* <li className="nav-item">
              <a className="nav-link" href="#menu3" data-toggle="tab">
                Manage Answer
              </a>
            </li> */}
          <li className="nav-item">
            <a className="nav-link" href="#menu4" data-toggle="tab">
              Setting
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <Profile />
          <QuestionManagement />
          {/* <AnswerManagement /> */}
          <Setting />
        </div>
      </>
    );
  };
  if (redirect) return <Redirect to={redirect} />;

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossOrigin="anonymous"
      />
      <div className="container">{renderMenu()}</div>
    </div>
  );
};

export default ProfileSetting;
