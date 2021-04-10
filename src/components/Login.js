import React from 'react';
import loginService from '../services/login';

const Login = ({ username, password, setUsername, setPassword, setUser }) => {
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

      setUser(user);
      setUsername('');
      setPassword('');
      console.log('logged in!');
    } catch (exception) {
      console.log(exception);
      //setErrorMessage('Wrong credentials');
      //setTimeout(() => {
      //  setErrorMessage(null);
      //}, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>login</h2>
      <div>
        <label htmlFor="Username">username </label>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="Password">password </label>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default Login;