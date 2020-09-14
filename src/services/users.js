import Axios from 'axios';

const BASE_URL =
  process.env.REACT_APP_API_URL || 'https://b01b8ea66373.ngrok.io/api';
const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export default {
  getUser: (id) =>
    Axios.get(`${BASE_URL}/getUser${id}`, {
      headers: HEADERS,
    }).then((res) => res.data),

  getUsers: () =>
    Axios.get(`${BASE_URL}/getUsers`, {
      headers: HEADERS,
    }).then((res) => res.data),

  getTechnicalUsers: () =>
    Axios.get(`${BASE_URL}/getTechnicalUsers`, {
      headers: HEADERS,
    }).then((res) => res.data),

  createUser: (payload) =>
    Axios.post(`${BASE_URL}/createUser`, payload, {
      headers: HEADERS,
    }).then((res) => res.data),
};
