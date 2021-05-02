import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import { Link } from 'react-router-dom';

const BlogList = ({ setBlogs }) => {
  const blogs = useSelector(state =>
    state.blogs.sort((a, b) => {
      return b.likes - a.likes;
    })
  );
  const blogFormRef = useRef();
  const blogStyle = {
    width: '30%',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div>
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
        <p key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </p>
      )}
    </div>
  );
};

export default BlogList;