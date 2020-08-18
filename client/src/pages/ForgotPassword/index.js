import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import ForgotValidator from '../../validators/forgotPassword';
import UserService from '../../services/userService';

const ResetPasswordPage = (props) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState({});
  const handleSubmit = () => {
    const errors = ForgotValidator(email);
    setError(errors);
    if (Object.keys(errors).length > 0) return;
    UserService.forgotPassword(email).then((data) => {
      if (data.message) {
        toast.success(data.message);
        const { history } = props;
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
              <h2 className="text-center">Forgot Password?</h2>
              <p> You can reset your password here.</p>
              <div className="panel-body">
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon">
                      <i className="glyphicon glyphicon-envelope color-blue" />
                    </span>
                    <input
                      id="email"
                      name="email"
                      placeholder="email address"
                      className="form-control"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                {error && error.email && error.email.length > 0 && (
                  <span className="error" style={{ color: 'red' }}>
                    {error.email}
                  </span>
                )}
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

ResetPasswordPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ResetPasswordPage;
