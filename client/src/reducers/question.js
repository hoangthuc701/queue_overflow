import questionConstants from '../constants/question';

const initialState = {
  title: '',
  content: '',
  category: {},
  author: {},
  tags: [],
  rating_detail: {},
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case questionConstants.GET_QUESTION_REQUEST_SUCCESS:
      return action.question;
    case questionConstants.LIKE_QUESTION_SUCCESS:
      return {
        ...state,
        vote: action.data.vote,
        rating_detail: {
          ...state.rating_detail,
          totalLike: action.data.totalLike,
          totalDislike: action.data.totalDislike,
        },
      };
    case questionConstants.DISLIKE_QUESTION_SUCCESS:
      return {
        ...state,
        vote: action.data.vote,
        rating_detail: {
          ...state.rating_detail,
          totalLike: action.data.totalLike,
          totalDislike: action.data.totalDislike,
        },
      };
    default:
      return state;
  }
}
