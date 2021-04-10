import React, { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import Login from './components/Login';
import Notification from './components/Notification';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');   
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );
  }, []);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('loggedBlogListUser'));

    if (user) {
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    }
  }, []);

  return (
    <div>
      {user === null ? 
        <h2>login</h2>
        : 
        <h2>blogs</h2>
      }
      <Notification
        notification={notification}
      ></Notification>
      {user === null ? 
        <Login 
          username={username} 
          setUsername={setUsername} 
          password={password} 
          setPassword={setPassword} 
          setUser={setUser}
          setNotification={setNotification}
        ></Login>
        : 
        <BlogList 
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
          setUser={setUser}
          setNotification={setNotification}
        ></BlogList>
      }
    </div>
  );
};

export default App;