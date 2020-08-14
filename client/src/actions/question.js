import questionpageConstants from '../constants/question';
import questionService from '../services/questionService';
import userQuestionContants from '../constants/userQuestion';
import { getToken } from '../helper/auth';

function requestList(questionlist) {
  return { type: questionpageConstants.QUESTIONLIST_REQUEST, questionlist };
}
function successList(questionlist) {
  return { type: questionpageConstants.QUESTION_SUCCESS, questionlist };
}
function failureList(error) {
  return { type: questionpageConstants.QUESTION_FAILURE, error };
}

function questionList(page = 1, filter = 'newest') {
  return async (dispatch) => {
    dispatch(requestList(filter));
    const values = await questionService.getListQuestion(page, filter);
    if (values.message) {
      dispatch(successList(values.data));
    } else {
      dispatch(failureList());
    }
  };
}

function requestUserQuestions() {
  return {
    type: userQuestionContants.GET_USER_QUESTIONS_REQUEST,
  };
}
function successUserQuestions(questionlist) {
  return {
    type: userQuestionContants.GET_USER_QUESTIONS_SUCCESS,
    questionlist,
  };
}
function failureUserQuestions(error) {
  return { type: userQuestionContants.GET_USER_QUESTIONS_FAILURE, error };
}

function getUserQuestions() {
  return async (dispatch) => {
    dispatch(requestUserQuestions());
    const token = getToken();
    const values = await questionService.getQuestionsByToken(token);
    if (values.message) {
      dispatch(successUserQuestions(values.data));
    } else {
      dispatch(failureUserQuestions(values.error));
    }
  };
}
const questionActions = {
  questionList,
  getUserQuestions,
};

export default questionActions;
