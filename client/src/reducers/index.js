import { combineReducers } from 'redux';
import userReducer from './user';
import questionListReducer from './questionlist';

const rootReducer = combineReducers({
  user: userReducer,
  questionList: questionListReducer,
});

export default rootReducer;
