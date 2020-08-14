import modalConstants from '../constants/modal';

function showModal(title, content) {
  return (dispatch) => {
    dispatch({
      type: modalConstants.SHOW_MODAL,
      data: {
        content,
        title,
      },
    });
  };
}

function hideModal(result) {
  return (dispatch) => {
    dispatch({ type: modalConstants.HIDE_MODEL, data: { result } });
  };
}

const authActions = {
  showModal,
  hideModal,
};

export default authActions;
