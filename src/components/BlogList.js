import React, { useRef } from 'react';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const BlogList = ({ blogs, setBlogs, user, setUser, setNotification }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogListUser');
    setUser(null);
    console.log('logged out!');
  };
  const blogFormRef = useRef();

  return (
    <div>
      <p>
        {user.name} logged in 
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable
        buttonLabel={'new note'}
        ref={blogFormRef}
      >
        <BlogForm 
          setBlogs={setBlogs}
          blogs={blogs}
          setNotification={setNotification}
          blogFormRef={blogFormRef}
        />
      </Togglable>
      {blogs.map(blog => 
        <Blog 
          key={blog.id} 
          blog={blog}
        />
      )}
    </div>
  );
};

export default BlogList;