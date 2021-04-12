import React, { useState } from 'react';

const Blog = ({ blog }) => {
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
  const addLike = (e) => {
    e.preventDefault();
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