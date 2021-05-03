import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core';

const BlogList = ({ setBlogs }) => {
  const blogs = useSelector(state =>
    state.blogs.sort((a, b) => {
      return b.likes - a.likes;
    })
  );
  const blogFormRef = useRef();

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
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map(blog => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>
                  {blog.author}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BlogList;