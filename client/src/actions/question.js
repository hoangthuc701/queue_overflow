import questionpageConstants from '../constants/question';
import questionService from '../services/questionService';
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
    }
    else {

        dispatch(failureList());
    }
  };
}
const questionActions = {
  questionList,
};

export default questionActions;
