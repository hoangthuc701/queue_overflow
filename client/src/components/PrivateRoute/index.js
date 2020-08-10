import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { isAuthenticate } from '../../helper/auth';

const PrivateRoute = ({ component: Component, ...rests }) => (
  <Route
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rests}
    render={(props) =>
      isAuthenticate() ? (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/signin' }} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
};
export default PrivateRoute;
