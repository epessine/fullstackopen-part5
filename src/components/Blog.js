import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSuccessNotification, setErrorNotification } from '../reducers/notificationReducer';
import { likeBlog, deleteBlog } from '../reducers/blogsReducer';
import { useParams, useHistory } from 'react-router-dom';

const Blog = () => {
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

  if (!blog) return null;
  return (
    <div>
      <h2> {`${blog.title} by ${blog.author}`} </h2>
      <span>
        <a href={blog.url}>{blog.url}</a><br/>
      </span>
      <span id="likes-counter">{blog.likes}</span><button onClick={addLike}>like</button><br/>
      <span>{`added by ${blog.user.name}`}<br/></span>
      <button onClick={destroyBlog}>remove</button>
    </div>
  );
};

export default Blog;