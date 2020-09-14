import Axios from 'axios';

const BASE_URL =
  process.env.REACT_APP_API_URL || 'https://b01b8ea66373.ngrok.io/api';
const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export default {
  login: (payload) =>
    Axios.post(`${BASE_URL}/login`, payload, { headers: HEADERS })
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        return err;
      }),
};
