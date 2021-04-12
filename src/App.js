import React, { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');   
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(async () => {
    const blogs = await blogService.getAll();
    blogs.sort((a, b) => {
      return b.likes - a.likes;
    });
    setBlogs(blogs);
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
      />
      {user === null ? 
        <LoginForm 
          username={username} 
          setUsername={setUsername} 
          password={password} 
          setPassword={setPassword} 
          setUser={setUser}
          setNotification={setNotification}
        />
        : 
        <BlogList 
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
          setUser={setUser}
          setNotification={setNotification}
        />
      }
    </div>
  );
};

export default App;