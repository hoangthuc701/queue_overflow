import { combineReducers } from 'redux';
import userReducer from './user';
import userInfoReducer from './user_info';
import questionReducer from './question';
import modalReducer from './modal';
import questionListReducer from './questionlist';

const rootReducer = combineReducers({
  user: userReducer,
  user_info: userInfoReducer,
  question: questionReducer,
  modal: modalReducer,
  questionList: questionListReducer,
});

export default rootReducer;
