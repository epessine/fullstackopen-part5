import { createStore, applyMiddleware, combineReducers } from 'redux';
import notificationReducer from './reducers/notificationReducer';
import blogsReducer from './reducers/blogsReducer';
import userReducer from './reducers/userReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const enhancer = composeWithDevTools(applyMiddleware(thunk));
const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  user: userReducer
});
const store = createStore(reducer, enhancer);

export default store;