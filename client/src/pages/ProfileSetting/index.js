import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import AnswerManagement from './components/AnswerManagement';
import Profile from './components/Profile';
import QuestionManagement from './components/QuestionManagement';
import Setting from './components/Setting';
import userActions from '../../actions/profileSetting';
import { getUser } from '../../helper/auth';

const ProfileSetting = () => {
  const dispatch = useDispatch();
  const [onlyProfile, setOnlyProfile] = useState(false);
  const [redirect, setRedirect] = useState();
  let { user_id } = useParams();

  useEffect(() => {
    const user = getUser();
    if (!user_id) {
      if (!user) {
        setRedirect('/signin');
        return;
      }
      user_id = user._id;
    } else if (user_id !== user._id) {
      setOnlyProfile(true);
    } else {
      setOnlyProfile(false);
    }
    setRedirect(false);
    const userInfo = async () => {
      const isSuccess = await dispatch(userActions.getUserInfo(user_id));
      if (isSuccess) {
        setRedirect();
      } else {
        setRedirect('/');
      }
    };
    userInfo();
  }, []);

  const Menu = ({ onlyProfile }) => {
    if (onlyProfile) {
      return (
        <>
          <div className="tab-content">
            <Profile />
          </div>
        </>
      );
    } else {
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
            <li className="nav-item">
              <a className="nav-link" href="#menu3" data-toggle="tab">
                Manage Answer
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#menu4" data-toggle="tab">
                Setting
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <Profile />
            <QuestionManagement />
            <AnswerManagement />
            <Setting />
          </div>
        </>
      );
    }
  };
  if (redirect) return <Redirect to={redirect} />;
  else
    return (
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        {/*BOOTSTRAP*/}
        {/* CSS only */}
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossOrigin="anonymous"
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              '\n      a {\n        text-decoration: none !important;\n      }\n      .navtop {\n        margin-top: 50px;\n      }\n      .tab-content {\n        padding: 40px;\n        margin-top: -20px;\n      }\n      .avatar {\n        width: 17em;\n        height: 17em;\n      }\n\n      .question {\n        color: rgb(0, 0, 0);\n      }\n    ',
          }}
        />
        <div className="container">
          <Menu onlyProfile={onlyProfile} />
        </div>
      </div>
    );
};

export default ProfileSetting;
