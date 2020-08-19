import questionConstants from '../constants/question';
import answerConstants from '../constants/answer';

const initialState = {
  _id: '',
  created_time: '',
  title: '',
  content: '',
  category: {},
  author: {},
  tags: [],
  rating_detail: {
    totalLike: 0,
    totalDislike: 0,
  },
  answers: [],
  vote: 'none',
  deleted: false,
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case questionConstants.GET_QUESTION_REQUEST:
      return {
        ...state,
        deleted: false,
      };
    case questionConstants.GET_QUESTION_REQUEST_SUCCESS:
      return {
        ...action.question,
        deleted: false,
      };
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
    case questionConstants.DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        deleted: true,
      };
    case answerConstants.LIKE_ANSWER_SUCCESS:
      return {
        ...state,
        answers: state.answers.map((answer) => {
          // eslint-disable-next-line no-underscore-dangle
          if (action.data.answerId === answer._id) {
            const { totalLike, totalDislike, vote } = action.data;
            return {
              ...answer,
              rating_detail: {
                totalLike,
                totalDislike,
              },
              vote,
            };
          }
          return answer;
        }),
      };
    case answerConstants.DISLIKE_ANSWER_SUCCESS:
      return {
        ...state,
        answers: state.answers.map((answer) => {
          // eslint-disable-next-line no-underscore-dangle
          if (action.data.answerId === answer._id) {
            const { totalLike, totalDislike, vote } = action.data;
            return {
              ...answer,
              rating_detail: {
                totalLike,
                totalDislike,
              },
              vote,
            };
          }
          return answer;
        }),
      };
    case answerConstants.ADD_ANSWER_SUCCESS:
      return {
        ...state,
        answers: [...state.answers, action.data],
      };
    case answerConstants.DELETE_ANSWER_SUCCESS:
      return {
        ...state,
        answers: state.answers.filter(
          // eslint-disable-next-line no-underscore-dangle
          (answer) => answer._id !== action.data.answerId
        ),
      };
    case answerConstants.MARK_AS_BEST_ANSWER_SUCCESS:
      return {
        ...state,
        answers: action.data,
      };
    default:
      return state;
  }
}
