import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSuccessNotification, setErrorNotification } from '../reducers/notificationReducer';
import { addBlog, initializeBlogs } from '../reducers/blogsReducer';

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addBlog({ title, author, url }));
      dispatch(setSuccessNotification(
        `new blog '${title}' by ${author || 'anonymous'} added`,
        5000
      ));
      await dispatch(initializeBlogs());
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      dispatch(setErrorNotification(error.message, 5000));
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
        id="blog-title"
        name="Title"
        onChange={({ target }) => setTitle(target.value)}
      />
      <br/>
      <label htmlFor="Author">author: </label>
      <input
        type="text"
        value={author}
        id="blog-author"
        name="Author"
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br/>
      <label htmlFor="Url">url: </label>
      <input
        required
        type="text"
        value={url}
        id="blog-url"
        name="Url"
        onChange={({ target }) => setUrl(target.value)}
      />
      <br/>
      <button
        type="submit"
        id="blog-create"
      >create</button>
    </form>
  );
};

export default BlogForm;