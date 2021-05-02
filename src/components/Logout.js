import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/userReducer';

const Logout = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  if (!user) return null;
  return (
    <span>
      {user.name} logged in
      <button onClick={() => { dispatch(logoutUser()); }}>logout</button>
    </span>
  );
};

export default Logout;