import React, { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = ({ blogs, setBlogs, setNotification, blogFormRef }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    try {
      const newBlog = await blogService.create({
        title: title,
        author: author,
        url: url
      });
      setBlogs(blogs.concat(newBlog));

      setNotification({
        message: `new blog '${newBlog.title}' by ${newBlog.author || 'anonymous'} added`,
        status: 'success'
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      setNotification({
        message: error.message,
        status: 'error'
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleCreateBlog}>
      <h2>create new</h2>
      <label htmlFor="Title">title: </label>
      <input
        required
        type="text"
        value={title}
        name="Title"
        onChange={({ target }) => setTitle(target.value)}
      />
      <br/>
      <label htmlFor="Author">author: </label>
      <input
        type="text"
        value={author}
        name="Author"
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br/>
      <label htmlFor="Url">url: </label>
      <input
        required
        type="text"
        value={url}
        name="Url"
        onChange={({ target }) => setUrl(target.value)}
      />
      <br/>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;