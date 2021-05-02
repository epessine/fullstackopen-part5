import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { initializeBlogs } from './reducers/blogsReducer';
import { initializeUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(async () => {
    dispatch(initializeBlogs());
  }, []);
  useEffect(() => {
    dispatch(initializeUser());
    setUsername('');
    setPassword('');
  }, []);

  return (
    <div>
      {user === null ?
        <h2>login</h2>
        :
        <h2>blogs</h2>
      }
      <Notification/>
      {user === null ?
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
        :
        <BlogList
          user={user}
        />
      }
    </div>
  );
};

export default App;