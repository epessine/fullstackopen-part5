import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSuccessNotification, setErrorNotification } from '../reducers/notificationReducer';
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogsReducer';
import { useParams, useHistory } from 'react-router-dom';
import { Typography, Button, TextField, List, ListItem, ListItemText } from '@material-ui/core';

const Blog = () => {
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const blog = useSelector(state =>
    state.blogs.find(blog => blog.id === id)
  );

  const addLike = async (e) => {
    e.preventDefault();
    try {
      await dispatch(likeBlog(id));
    } catch (exception) {
      dispatch(setErrorNotification(exception.message, 5000));
    }
  };

  const destroyBlog = async (e) => {
    e.preventDefault();
    if (!window.confirm(`delete '${blog.title}'?`)) return;
    try {
      await dispatch(deleteBlog(blog.id));
      dispatch(setSuccessNotification(
        `blog '${blog.title}' by ${blog.author || 'anonymous'} deleted`,
        5000
      ));
      history.push('/');
    } catch (exception) {
      dispatch(setErrorNotification(exception.message, 5000));
    }
  };

  const handleCreateComment = async (e) => {
    e.preventDefault();
    try {
      await dispatch(commentBlog(id, comment));
    } catch (exception) {
      dispatch(setErrorNotification(exception.message, 5000));
    }
  };

  if (!blog) return null;
  return (
    <div>
      <Typography variant="h4">
        {`${blog.title} by ${blog.author}`}
      </Typography>
      <Typography variant="body1">
        <a href={blog.url}>{blog.url}</a>
      </Typography>
      <Typography variant="body1">
        {blog.likes}
        <Button
          variant='contained'
          color='primary'
          size='small'
          onClick={addLike}
        > like </Button>
      </Typography>
      <Typography variant="body1">
        {`added by ${blog.user.name}`}
      </Typography>
      <Button
        variant='contained'
        color='primary'
        size='small'
        onClick={destroyBlog}
      > remove </Button>
      <Typography variant="h5">
        comments
      </Typography>
      <form onSubmit={handleCreateComment}>
        <TextField
          required
          value={comment}
          label="comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <Button
          variant='contained'
          color='primary'
          size='small'
          type='submit'
        > add comment </Button>
      </form>
      <List component="nav" aria-label="secondary mailbox folders">
        {blog.comments.map((comment, index) =>
          <ListItem key={index} button>
            <ListItemText primary={comment} />
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default Blog;