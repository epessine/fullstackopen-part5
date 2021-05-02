import blogService from '../services/blogs';

const reducer = (state = [], { type, data }) => {
  switch (type) {
  case 'ADD_BLOG':
    return [
      ...state,
      data
    ];

  case 'LIKE_BLOG':
    return state.map(blog => {
      if (blog.id === data) {
        blog.likes++;
      }
      return blog;
    });

  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== data);

  case 'INITIALIZE_BLOGS':
    return data;
  default: return state;
  }
};

export const addBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create({
      title: blog.title,
      author: blog.author,
      url: blog.url
    });
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    });
  };
};

export const likeBlog = id => {
  return async dispatch => {
    await blogService.like(id);
    dispatch({
      type: 'LIKE_BLOG',
      data: id
    });
  };
};

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.destroy(id);
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    });
  };
};

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: blogs
    });
  };
};

export default reducer;
