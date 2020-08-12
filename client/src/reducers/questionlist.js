import questionlistContants from '../constants/question';

const initialquestionListState = {};

export default function questionlist(state = initialquestionListState, action) {
  switch (action.type) {
    case questionlistContants.QUESTIONLIST_REQUEST:
      return { getting: true };
    case questionlistContants.QUESTION_SUCCESS:
      return {
        getting: false,
        questionlist: action.questionList,
      };
    case questionlistContants.QUESTION_FAILURE:
      return {};
    default:
      return state;
  }
}
