import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSuccessNotification, setErrorNotification } from '../reducers/notificationReducer';
import { addBlog, initializeBlogs } from '../reducers/blogsReducer';
import { TextField, Button } from '@material-ui/core';

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
      <TextField
        required
        value={title}
        label="title"
        id="blog-title"
        name="Title"
        onChange={({ target }) => setTitle(target.value)}
      />
      <br/>
      <TextField
        required
        value={author}
        label="author"
        id="blog-author"
        name="Author"
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br/>
      <TextField
        required
        value={url}
        label="url"
        id="blog-url"
        name="Url"
        onChange={({ target }) => setUrl(target.value)}
      />
      <br/>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        id="blog-create"
      > create
      </Button>
    </form>
  );
};

export default BlogForm;