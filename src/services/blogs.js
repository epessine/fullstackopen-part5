import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => { 
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then(res => res.data);
};

const create = async blog => {
  const config = { headers: { Authorization: token } };
  const res = await axios.post(baseUrl, blog, config);
  return res.data;
};

const likeBlog = async (id, blog) => {
  const config = { headers: { Authorization: token } };
  const res = await axios.put(`${baseUrl}/${id}`, blog, config);
  return res.data;
};

export default {
  setToken,
  getAll,
  create,
  likeBlog
};