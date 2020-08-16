import Axios from 'axios';

const BASE_URL =
  process.env.REACT_APP_API_URL || 'http://192.168.1.10:3000/api';
const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export default {
  getUsers: () =>
    Axios.get(`${BASE_URL}/getUsers`, {
      headers: HEADERS,
    }).then((res) => res.data),

  getUser: (id) =>
    Axios.get(`${BASE_URL}/getUser${id}`, {
      headers: HEADERS,
    }).then((res) => res.data),
};
