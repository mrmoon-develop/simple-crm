import Axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://192.168.1.8:3000/api';
const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export default {
  getCompanies: () =>
    Axios.get(`${BASE_URL}/getCompanies`, {
      headers: HEADERS,
    })
      .then((res) => res.data)
      .catch((err) => {
        console.log('err', err);
        return err;
      }),
};
