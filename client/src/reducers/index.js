import { combineReducers } from 'redux';
import userReducer from './user';
import userInfoReducer from './user_info';

const rootReducer = combineReducers({
  user: userReducer,
  user_info: userInfoReducer,
});

export default rootReducer;
