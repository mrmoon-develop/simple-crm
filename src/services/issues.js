import Axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://192.168.1.8:3000/api';
const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export default {
  getIssue: (issueId) =>
    Axios.get(`${BASE_URL}/getIssue/${issueId}`, {
      headers: HEADERS,
    })
      .then((res) => res.data)
      .catch((err) => err),

  getActiveIssues: () =>
    Axios.get(`${BASE_URL}/getActiveIssues`, {
      headers: HEADERS,
    })
      .then((res) => res.data)
      .catch((err) => err),

  getFinishedIssues: () =>
    Axios.get(`${BASE_URL}/getFinishedIssues`, {
      headers: HEADERS,
    })
      .then((res) => res.data)
      .catch((err) => err),

  createIssue: (payload) =>
    Axios.post(`${BASE_URL}/createIssue`, payload, {
      headers: HEADERS,
    })
      .then((res) => res.data)
      .catch((err) => err),

  updateIssue: (payload) =>
    Axios.put(`${BASE_URL}/updateIssue`, payload, {
      headers: HEADERS,
    })
      .then((res) => res.data)
      .catch((err) => err),
};
