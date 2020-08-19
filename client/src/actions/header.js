import headerConstants from '../constants/header';

function reloadHeader() {
  return (dispatch) => {
    dispatch({
      type: headerConstants.RELOAD_HEADER,
    });
  };
}

const authActions = {
  reloadHeader,
};

export default authActions;
