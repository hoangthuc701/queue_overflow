import { toast } from 'react-toastify';
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
      dispatch(success({ ...data.data, answerId }));
    } else {
      dispatch(failure(data.error));
      toast.error('Please login to continue.');
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
    const data = await AnswerService.DislikeAnswer(answerId);
    if (!data.error) {
      dispatch(success({ ...data.data, answerId }));
    } else {
      dispatch(failure(data.error));
      toast.error('Please login to continue.');
    }
  };
}

function DeleteAnswer(answerId) {
  function request() {
    return { type: answerConstants.DELETE_ANSWER_REQUEST };
  }
  function success(data) {
    return { type: answerConstants.DELETE_ANSWER_SUCCESS, data };
  }
  function failure(error) {
    return { type: answerConstants.DELETE_ANSWER_FAILURE, error };
  }
  return async (dispatch) => {
    dispatch(request());
    const data = await AnswerService.delete(answerId);
    if (!data.error) {
      dispatch(success({ ...data.data, answerId }));
    } else {
      dispatch(failure(data.error));
    }
  };
}

function createNewAnswer(questionId, content) {
  function request() {
    return { type: answerConstants.ADD_ANSWER_REQUEST };
  }
  function success(data) {
    return { type: answerConstants.ADD_ANSWER_SUCCESS, data };
  }
  function failure(error) {
    return { type: answerConstants.ADD_ANSWER_FAILURE, error };
  }
  return async (dispatch) => {
    dispatch(request());
    const data = await AnswerService.createNew(questionId, content);
    if (!data.error) {
      dispatch(success(data.data));
      return true;
    }
    dispatch(failure(data.error));
    toast.error('Please login to continue.');
    return false;
  };
}

function markAsBestAnswer(questionId, commentId) {
  function request() {
    return { type: answerConstants.MARK_AS_BEST_ANSWER_REQUEST };
  }
  function success(data) {
    return { type: answerConstants.MARK_AS_BEST_ANSWER_SUCCESS, data };
  }
  function failure(error) {
    return { type: answerConstants.MARK_AS_BEST_ANSWER_FAILURE, error };
  }
  return async (dispatch) => {
    dispatch(request());
    const data = await AnswerService.MarkAsBestAnswer(questionId, commentId);
    if (!data.error) {
      dispatch(success(data.data));
      return true;
    }
    dispatch(failure(data.error));
    return false;
  };
}

const questionActions = {
  LikeAnswer,
  DislikeAnswer,
  DeleteAnswer,
  createNewAnswer,
  markAsBestAnswer,
};

export default questionActions;
