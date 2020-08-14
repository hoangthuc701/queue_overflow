import modalConstants from '../constants/modal';

const initialState = {
  show: false,
  content: '',
  title: '',
  result: false,
  type: '',
  id: '',
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case modalConstants.SHOW_MODAL:
      return {
        title: action.data.title,
        content: action.data.content,
        show: true,
        result: false,
        type: action.data.type,
        id: action.data.id,
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
