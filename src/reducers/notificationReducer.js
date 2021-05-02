const reducer = (state = null, { type, data }) => {
  switch (type) {
  case 'SET_SUCCESS_NOTIFICATION':
    return {
      message: data,
      status: 'success'
    };

  case 'SET_ERROR_NOTIFICATION':
    return {
      message: data,
      status: 'error'
    };

  case 'UNSET_NOTIFICATION':
    return null;

  default: return state;
  }
};

export const unsetNotification = () => {
  return {
    type: 'UNSET_NOTIFICATION'
  };
};

let lastTimeout;
export const setSuccessNotification = (message, time) => {
  clearTimeout(lastTimeout);
  return async dispatch => {
    dispatch({
      type: 'SET_SUCCESS_NOTIFICATION',
      data: message
    });
    setTimeout(() => dispatch(unsetNotification()), time);
  };
};

export const setErrorNotification = (message, time) => {
  clearTimeout(lastTimeout);
  return async dispatch => {
    dispatch({
      type: 'SET_ERROR_NOTIFICATION',
      data: message
    });
    setTimeout(() => dispatch(unsetNotification()), time);
  };
};

export default reducer;