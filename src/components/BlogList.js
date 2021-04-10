import React from 'react';
import Blog from './Blog';
import BlogForm from './BlogForm';

const BlogList = ({ blogs, setBlogs, user, setUser }) => {
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
      <BlogForm 
        setBlogs={setBlogs}
        blogs={blogs}
      ></BlogForm>
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog}></Blog>
      )}
    </div>
  );
};

export default BlogList;