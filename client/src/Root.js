import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import configureStore from './store/index';

const store = configureStore();

const Root = (props) => {
  const { children } = props;
  return <Provider store={store}>{children}</Provider>;
};

Root.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Root;
