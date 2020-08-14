import { combineReducers } from 'redux';
import userReducer from './user';
import userInfoReducer from './user_info';
import questionListReducer from './questionlist';

const rootReducer = combineReducers({
  user: userReducer,
  user_info: userInfoReducer,
  questionList: questionListReducer,
});

export default rootReducer;
