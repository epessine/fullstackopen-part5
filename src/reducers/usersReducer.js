import userService from '../services/users';

const reducer = (state = [], { type, data }) => {
  switch (type) {
  case 'INITIALIZE_USERS':
    return data;
  default: return state;
  }
};

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll();
    dispatch({
      type: 'INITIALIZE_USERS',
      data: users
    });
  };
};

export default reducer;