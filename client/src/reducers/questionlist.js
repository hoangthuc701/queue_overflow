import questionlistContants from '../constants/question';

const initialquestionListState = {
  getting: true,
  questionlist: {
    question: {},
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
    default:
      return state;
  }
}
