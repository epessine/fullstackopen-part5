import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSuccessNotification, setErrorNotification } from '../reducers/notificationReducer';
import { likeBlog, deleteBlog } from '../reducers/blogsReducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
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
      await dispatch(likeBlog(blog.id));
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
    } catch (exception) {
      dispatch(setErrorNotification(exception.message, 5000));
    }
  };

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggleBlogDetails}>{visible ? 'hide' : 'view'}</button>
      {visible && (
        <div>
          <span>{blog.url} <br/></span>
          <span id="likes-counter">{blog.likes} </span><button onClick={addLike}>like</button><br/>
          <span>{blog.author} <br/></span>
          <button onClick={destroyBlog}>remove</button>
        </div>
      )}
    </div>
  );
};

export default Blog;