import { combineReducers } from 'redux';
import userReducer from './user';
import questionReducer from './question';
import modalReducer from './modal';

const rootReducer = combineReducers({
  user: userReducer,
  question: questionReducer,
  modal: modalReducer,
});

export default rootReducer;
