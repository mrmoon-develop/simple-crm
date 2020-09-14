import Axios from 'axios';

const BASE_URL =
  process.env.REACT_APP_API_URL || 'https://b01b8ea66373.ngrok.io/api';
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
