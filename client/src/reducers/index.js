import { combineReducers } from 'redux';
import userReducer from './user';
import questionReducer from './question';

const rootReducer = combineReducers({
  user: userReducer,
  question: questionReducer,
});

export default rootReducer;
