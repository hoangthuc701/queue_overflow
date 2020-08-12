import { toast } from 'react-toastify';
import questionpageConstants from '../constants/questionpage';

function request(questionlist) {
  return { type: questionpageConstants.QUESTIONLIST_REQUEST, questionlist };
}
function success(questionlist) {
  return { type: questionpageConstants.QUESTION_SUCCESS, questionlist };
}
function failure(error) {
  return { type: questionpageConstants.QUESTION_FAILURE, error };
}

function questionList() {
  return async (dispatch) => {
    dispatch(request(questionlist));
    
  };
}
