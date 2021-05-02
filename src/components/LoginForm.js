import React from 'react';
import { useDispatch } from 'react-redux';
import { setSuccessNotification, setErrorNotification } from '../reducers/notificationReducer';
import { loginUser } from '../reducers/userReducer';

const LoginForm = ({ username, password, setUsername, setPassword }) => {
  const dispatch = useDispatch();
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
        <label htmlFor="Username">username </label>
        <input
          type="text"
          value={username}
          id="username"
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="Password">password </label>
        <input
          type="password"
          value={password}
          id="password"
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;