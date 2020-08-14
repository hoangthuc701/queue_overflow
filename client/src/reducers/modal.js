import modalConstants from '../constants/modal';

const initialState = {
  show: true,
  content: '',
  title: '',
  result: false,
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case modalConstants.SHOW_MODAL:
      return {
        title: action.data.title,
        content: action.data.content,
        show: true,
        result: false,
      };
    case modalConstants.HIDE_MODEL:
      return {
        ...state,
        show: false,
        result: action.data.result,
      };
    default:
      return state;
  }
}
