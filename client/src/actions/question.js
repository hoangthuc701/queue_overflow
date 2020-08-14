import questionConstants from '../constants/question';
import QuestionService from '../services/questionService';

function getQuestionDetail(questionId) {
  function request() {
    return { type: questionConstants.GET_QUESTION_REQUEST };
  }
  function success(question) {
    return { type: questionConstants.GET_QUESTION_REQUEST_SUCCESS, question };
  }
  function failure(error) {
    return { type: questionConstants.GET_QUESTION_REQUEST_FAILURE, error };
  }
  return async (dispatch) => {
    dispatch(request());
    const data = await QuestionService.getDetailQuestion(questionId);
    if (!data.error) {
      dispatch(success(data.data));
    } else {
      dispatch(failure(data.error));
    }
  };
}

function LikeQuestion(questionId) {
  function request() {
    return { type: questionConstants.LIKE_QUESTION_REQUEST };
  }
  function success(data) {
    return { type: questionConstants.LIKE_QUESTION_SUCCESS, data };
  }
  function failure(error) {
    return { type: questionConstants.LIKE_QUESTION_FAILURE, error };
  }
  return async (dispatch) => {
    dispatch(request());
    const data = await QuestionService.LikeQuestion(questionId);
    if (!data.error) {
      dispatch(success(data.data));
    } else {
      dispatch(failure(data.error));
    }
  };
}

function DislikeQuestion(questionId) {
  function request() {
    return { type: questionConstants.DISLIKE_QUESTION_REQUEST };
  }
  function success(data) {
    return { type: questionConstants.DISLIKE_QUESTION_SUCCESS, data };
  }
  function failure(error) {
    return { type: questionConstants.DISLIKE_QUESTION_FAILURE, error };
  }
  return async (dispatch) => {
    dispatch(request());
    const data = await QuestionService.DislikeQuestion(questionId);
    if (!data.error) {
      dispatch(success(data.data));
    } else {
      dispatch(failure(data.error));
    }
  };
}
function DeleteQuestion(questionId) {
  function request() {
    return { type: questionConstants.DELETE_QUESTION_REQUEST };
  }
  function success(data) {
    return { type: questionConstants.DELETE_QUESTION_SUCCESS, data };
  }
  function failure(error) {
    return { type: questionConstants.DELETE_QUESTION_FAILURE, error };
  }
  return async (dispatch) => {
    dispatch(request());
    const data = await QuestionService.deleteQuestion(questionId);
    if (!data.error) {
      dispatch(success(data.data));
      return true;
    }
    dispatch(failure(data.error));
    return false;
  };
}

const questionActions = {
  getQuestionDetail,
  LikeQuestion,
  DislikeQuestion,
  DeleteQuestion,
};

export default questionActions;
