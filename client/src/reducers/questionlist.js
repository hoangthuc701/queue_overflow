import questionlistContants from '../constants/question';
import userQuestionContants from '../constants/userQuestion';

const initialquestionListState = {
  getting: true,
  questionlist: {
    questions: [],
    totalCount: 0,
  },
};
export default function questionlist(state = initialquestionListState, action) {
  switch (action.type) {
    case questionlistContants.QUESTIONLIST_REQUEST:
      return { ...state, getting: true };
    case questionlistContants.QUESTION_SUCCESS:
      return {
        getting: false,
        questionlist: action.questionlist,
      };
    case questionlistContants.QUESTION_FAILURE:
      return {};
    case userQuestionContants.GET_USER_QUESTIONS_REQUEST:
      return { ...state, getting: true };
    case userQuestionContants.GET_USER_QUESTIONS_SUCCESS:
      return {
        getting: false,
        questionlist: action.questionlist,
      };
    case userQuestionContants.GET_USER_QUESTIONS_FAILURE:
      return {
        ...state,
        getting: false,
      };
    default:
      return state;
  }
}
