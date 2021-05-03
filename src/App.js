import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import UserList from './components/UserList';
import User from './components/User';
import Blog from './components/Blog';
import Logout from './components/Logout';
import { initializeBlogs } from './reducers/blogsReducer';
import { initializeUser } from './reducers/userReducer';
import { initializeUsers } from './reducers/usersReducer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Divider
} from '@material-ui/core';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(async () => {
    await dispatch(initializeBlogs());
  }, []);
  useEffect(() => {
    dispatch(initializeUser());
  }, []);
  useEffect(async () => {
    await dispatch(initializeUsers());
  }, []);

  return (
    <Container>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              blog
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
            <Logout />
          </Toolbar>
        </AppBar>
        {user === null ?
          <div>
            <Typography variant="h4">
            login
            </Typography>
            <Divider />
            <Notification />
            <LoginForm />
          </div>
          :
          <div>
            <Typography variant="h4">
              blogs
            </Typography>
            <Divider />
            <Notification />
            <Switch>
              <Route exact path='/'>
                <BlogList />
              </Route>
              <Route path='/blogs/:id'>
                <Blog />
              </Route>
              <Route exact path='/users'>
                <h2>users</h2>
                <UserList />
              </Route>
              <Route path='/users/:id'>
                <User />
              </Route>
            </Switch>
          </div>
        }
      </Router>
    </Container>
  );
};

export default App;