import loginService from '../services/login';
import blogService from '../services/blogs';

const reducer = (state = null, { type, data }) => {
  switch (type) {
  case 'SET_USER':
    return data;
  case 'UNSET_USER':
    return null;
  default: return state;
  }
};

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username,
      password
    });
    window.localStorage.setItem(
      'loggedBlogListUser',
      JSON.stringify(user)
    );
    blogService.setToken(user.token);
    dispatch({
      type: 'SET_USER',
      data: user
    });
  };
};

export const initializeUser = () => {
  const user = JSON.parse(window.localStorage.getItem('loggedBlogListUser'));
  if (user) {
    blogService.setToken(user.token);
    return {
      type: 'SET_USER',
      data: user
    };
  }
  return { type: 'NONE' };
};

export const logoutUser = () => {
  window.localStorage.removeItem('loggedBlogListUser');
  return {
    type: 'UNSET_USER'
  };
};

export default reducer;