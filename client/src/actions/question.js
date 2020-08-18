import { toast } from 'react-toastify';
import questionConstants from '../constants/question';
import userQuestionConstants from '../constants/userQuestion';
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
      return true;
    }
    dispatch(failure(data.error));
    return false;
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
      toast.error('Please login to continue.');
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
      toast.error('Please login to continue.');
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
      toast.success(data.message);
      return true;
    }
    dispatch(failure(data.error));
    return false;
  };
}

function requestList(questionlist) {
  return { type: questionConstants.QUESTIONLIST_REQUEST, questionlist };
}
function successList(questionlist) {
  return { type: questionConstants.QUESTION_SUCCESS, questionlist };
}
function failureList(error) {
  return { type: questionConstants.QUESTION_FAILURE, error };
}

function questionList(page = 1, filter = 'newest') {
  return async (dispatch) => {
    dispatch(requestList(filter));
    const values = await QuestionService.getListQuestion(page, filter);
    if (values.message) {
      dispatch(successList(values.data));
    } else {
      dispatch(failureList());
    }
  };
}

function requestUserQuestions() {
  return {
    type: userQuestionConstants.GET_USER_QUESTIONS_REQUEST,
  };
}
function successUserQuestions(questionlist) {
  return {
    type: userQuestionConstants.GET_USER_QUESTIONS_SUCCESS,
    questionlist,
  };
}
function failureUserQuestions(error) {
  return { type: userQuestionConstants.GET_USER_QUESTIONS_FAILURE, error };
}

function getUserQuestions(page = 1) {
  return async (dispatch) => {
    dispatch(requestUserQuestions());
    const values = await QuestionService.getQuestionsByToken(page);
    if (values.message) {
      dispatch(successUserQuestions(values.data));
    } else {
      dispatch(failureUserQuestions(values.error));
    }
  };
}

const questionActions = {
  getQuestionDetail,
  LikeQuestion,
  DislikeQuestion,
  DeleteQuestion,
  questionList,
  getUserQuestions,
};

export default questionActions;
