import headerConstants from '../constants/header';

const initialState = {
  show: false,
};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case headerConstants.RELOAD_HEADER:
      return {
        show: !state.show,
      };
    default:
      return state;
  }
}
