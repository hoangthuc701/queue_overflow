import { combineReducers } from 'redux';
import userReducer from './user';
import questionReducer from './question';
import modalReducer from './modal';
import questionListReducer from './questionlist';

const rootReducer = combineReducers({
  user: userReducer,
  question: questionReducer,
  modal: modalReducer,
  questionList: questionListReducer,
});

export default rootReducer;
