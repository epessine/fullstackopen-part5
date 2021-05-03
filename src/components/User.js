import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core';

const User = () => {
  const { id } = useParams();
  const user = useSelector(state =>
    state.users.find(user => user.id === id)
  );
  if (!user) return null;
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {user.blogs.map(blog => (
              <TableRow key={blog.id}>
                <TableCell>
                  {blog.title}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default User;