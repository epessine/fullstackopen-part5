import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSuccessNotification, setErrorNotification } from '../reducers/notificationReducer';
import { loginUser } from '../reducers/userReducer';
import { TextField, Button } from '@material-ui/core';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginUser(username, password));
      setUsername('');
      setPassword('');
      dispatch(setSuccessNotification(`${username} logged in!`, 5000));
    } catch (error) {
      dispatch(setErrorNotification('wrong username or password', 5000));
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          required
          value={username}
          label="username"
          id="username"
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <TextField
          required
          type='password'
          value={password}
          label="password"
          id="password"
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        type="submit"
      > login
      </Button>
    </form>
  );
};

export default LoginForm;