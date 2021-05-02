import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async blog => {
  const config = { headers: { Authorization: token } };
  const res = await axios.post(baseUrl, blog, config);
  return res.data;
};

const destroy = async (id) => {
  const config = { headers: { Authorization: token } };
  const res = await axios.delete(`${baseUrl}/${id}`, config);
  return res.data;
};

const like = async (id) => {
  const config = { headers: { Authorization: token } };
  const { data } = await axios.get(`${baseUrl}/${id}`);
  const res = await axios.put(
    `${baseUrl}/${id}`,
    { ...data, likes: data.likes + 1 },
    config
  );
  return res.data;
};

export default {
  setToken,
  getAll,
  create,
  destroy,
  like
};