import answerConstants from '../constants/answer';
import AnswerService from '../services/answerService';

function LikeAnswer(answerId) {
  function request() {
    return { type: answerConstants.LIKE_ANSWER_REQUEST };
  }
  function success(data) {
    return { type: answerConstants.LIKE_ANSWER_SUCCESS, data };
  }
  function failure(error) {
    return { type: answerConstants.LIKE_ANSWER_FAILURE, error };
  }
  return async (dispatch) => {
    dispatch(request());
    const data = await AnswerService.LikeAnswer(answerId);
    if (!data.error) {
      dispatch(success(data.data));
    } else {
      dispatch(failure(data.error));
    }
  };
}

function DislikeAnswer(answerId) {
  function request() {
    return { type: answerConstants.DISLIKE_ANSWER_REQUEST };
  }
  function success(data) {
    return { type: answerConstants.DISLIKE_ANSWER_SUCCESS, data };
  }
  function failure(error) {
    return { type: answerConstants.DISLIKE_ANSWER_FAILURE, error };
  }
  return async (dispatch) => {
    dispatch(request());
    const data = await AnswerService.LikeQuestion(answerId);
    if (!data.error) {
      dispatch(success(data.data));
    } else {
      dispatch(failure(data.error));
    }
  };
}

const questionActions = {
  LikeAnswer,
  DislikeAnswer,
};

export default questionActions;
