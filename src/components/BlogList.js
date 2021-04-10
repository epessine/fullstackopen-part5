import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, user, setUser }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogListUser');
    setUser(null);
    console.log('logged out!');
  };

  return (
    <div>
      <h2>blogs</h2>
      <p> 
        {user.name} logged in 
        <button onClick={handleLogout}>logout</button>
      </p>
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog}></Blog>
      )}
    </div>
  );
};

export default BlogList;