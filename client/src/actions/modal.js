import modalConstants from '../constants/modal';
import answerAction from './answer';
import questionAction from './question';

function showModal(title, content, type, id) {
  return (dispatch) => {
    dispatch({
      type: modalConstants.SHOW_MODAL,
      data: {
        content,
        title,
        type,
        id,
      },
    });
  };
}

function hideModal(result, type, id) {
  return (dispatch) => {
    dispatch({ type: modalConstants.HIDE_MODEL, data: { result } });
    if (result) {
      if (type === 'question') {
        dispatch(questionAction.DeleteQuestion(id));
      } else if (type === 'answer') {
        dispatch(answerAction.DeleteAnswer(id));
      }
    }
  };
}

const authActions = {
  showModal,
  hideModal,
};

export default authActions;
