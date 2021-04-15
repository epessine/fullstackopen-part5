import React from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginForm = ({ username, password, setUsername, setPassword, setUser, setNotification }) => {
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem(
        'loggedBlogListUser',
        JSON.stringify(user)
      );

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');

      setNotification({
        message: `${user.name} logged in!`,
        status: 'success'
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      setNotification({
        message: 'wrong username or password',
        status: 'error'
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
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