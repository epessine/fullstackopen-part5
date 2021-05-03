import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/userReducer';
import { Typography, Button } from '@material-ui/core';

const Logout = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  if (!user) return null;
  return (
    <span>
      <Typography variant="button">
        {user.name} logged in
        <Button
          variant='outlined'
          color='default'
          size='small'
          onClick={() => { dispatch(logoutUser()); }}
        > logout
        </Button>
      </Typography>
    </span>
  );
};

export default Logout;