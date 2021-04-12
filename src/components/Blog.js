import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, blogs, setBlogs, setNotification }) => {
  const blogStyle = {
    width: '30%',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };
  const [visible, setVisible] = useState(false);
  const toggleBlogDetails = (e) => {
    e.preventDefault();
    setVisible(!visible);
  };
  const addLike = async (e) => {
    e.preventDefault();
    try {
      await blogService.likeBlog(blog.id, {
        likes: blog.likes + 1
      });
      setBlogs(
        blogs.map(savedBlog => {
          if (savedBlog === blog) {
            savedBlog.likes++;
          }
          return savedBlog;
        })
          .sort((a, b) => {
            return b.likes - a.likes;
          })
      );
    } catch (exception) {
      setNotification({
        message: exception.message,
        status: 'error'
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggleBlogDetails}>{visible ? 'hide' : 'view'}</button>
      {visible && (
        <div>
          {blog.url} <br/>
          {blog.likes} <button onClick={addLike}>like</button><br/>
          {blog.author}
        </div>
      )}
    </div>
  );
};

export default Blog;