import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useHistory } from 'react-router-dom';

import ResetPasswordValidator from '../../validators/resetPassword';
import UserService from '../../services/userService';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({});
  const { token } = useParams();
  const history = useHistory();

  const handleSubmit = () => {
    const errors = ResetPasswordValidator(password, confirmPassword);
    setError(errors);
    if (Object.keys(errors).length > 0) return;

    UserService.resetPassword(password, token).then((data) => {
      if (data.message) {
        toast.success(data.message);
        history.push('/');
      } else {
        toast.error(data.error);
      }
    });
  };

  return (
    <div className="row justify-content-center align-items-center">
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="text-center">
              <h3>
                <i className="fa fa-lock fa-4x" />
              </h3>
              <h2 className="text-center">Reset Password?</h2>
              <p> </p>
              <div className="panel-body">
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-envelope color-blue" />
                    </span>
                    <input
                      id="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {error && error.password && error.password.length > 0 && (
                    <span className="error" style={{ color: 'red' }}>
                      {error.password}
                    </span>
                  )}
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-envelope color-blue" />
                    </span>
                    <input
                      id="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                      type="password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  {error &&
                    error.confirmPassword &&
                    error.confirmPassword.length > 0 && (
                      <span className="error" style={{ color: 'red' }}>
                        {error.confirmPassword}
                      </span>
                    )}
                </div>
                <div className="form-group">
                  <input
                    name="recover-submit"
                    className="btn btn-lg btn-primary btn-block"
                    defaultValue="Reset Password"
                    onClick={handleSubmit}
                  />
                </div>
                <input
                  type="hidden"
                  className="hide"
                  name="token"
                  id="token"
                  defaultValue
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
