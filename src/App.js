import React, { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import Login from './components/Login';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');   
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );  
  }, []);

  return (
    <div>
      {user === null ? 
        <Login 
          username={username} 
          setUsername={setUsername} 
          password={password} 
          setPassword={setPassword} 
          setUser={setUser}
        ></Login>
        : 
        <BlogList 
          blogs={blogs}
          user={user}
        ></BlogList>
      }
    </div>
  );
};

export default App;