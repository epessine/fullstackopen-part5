import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/userReducer';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const BlogList = ({ setBlogs, user }) => {
  const dispatch = useDispatch();
  const blogs = useSelector(state =>
    state.blogs.sort((a, b) => {
      return b.likes - a.likes;
    })
  );
  const blogFormRef = useRef();

  return (
    <div>
      <p>
        {user.name} logged in
        <button onClick={() => { dispatch(logoutUser()); }}>logout</button>
      </p>
      <Togglable
        buttonLabel={'create new blog'}
        ref={blogFormRef}
      >
        <BlogForm
          setBlogs={setBlogs}
          blogs={blogs}
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