import Axios from 'axios';
// import Fs from 'react-native-fs';

const BASE_URL =
  process.env.REACT_APP_API_URL || 'https://b01b8ea66373.ngrok.io/api';
const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export default {
  getPoll: (id) =>
    Axios.get(`${BASE_URL}/getPoll${id}`, {
      headers: HEADERS,
    })
      .then((res) => res.data)
      .catch((err) => {
        console.log('err', err);
        return err;
      }),

  getPolls: () =>
    Axios.get(`${BASE_URL}/getPolls`, {
      headers: HEADERS,
    })
      .then((res) => res.data)
      .catch((err) => {
        console.log('err', err);
        return err;
      }),

  getPollByIssue: (id) =>
    Axios.get(`${BASE_URL}/getPollByIssue/${id}`, {
      headers: HEADERS,
    })
      .then((res) => res.data)
      .catch((err) => {
        console.log('err', err);
        return err;
      }),

  createPoll: (payload) =>
    Axios.get(`${BASE_URL}/createPoll`, payload, {
      headers: HEADERS,
    })
      .then((res) => res.data)
      .catch((err) => {
        console.log('err', err);
        return err;
      }),

  getPollsByCompany: (payload) =>
    Axios.get(`${BASE_URL}/getPollsByCompany`, payload, {
      headers: HEADERS,
    })
      .then((res) => res.data)
      .catch((err) => {
        console.log('err', err);
        return err;
      }),

  getPollsReportByCompany: (payload) =>
    Axios.post(`${BASE_URL}/getPollsReportByCompany`, payload, {
      headers: HEADERS,
    })
      .then((res) => res.data)
      .catch((err) => {
        console.log('err', err);
        return err;
      }),

  // getPollsReportByCompany: (id) =>
  //   Axios.request({
  //     method: 'GET',
  //     responseType: 'arraybuffer',
  //     url: `${BASE_URL}/getPollsReportByCompany/${id}`,
  //     // headers: {
  //     //   ...HEADERS,
  //     //   // Accept: 'application/octet-stream',
  //     //   // 'Content-Type': 'blob',
  //     //   'content-type': 'application/vnd.ms-excel;charset=UTF-8',
  //     // },
  //   })
  //     .then((res) => {
  //       return res.data;
  //     })
  //     .catch((err) => {
  //       console.log('err', err);
  //       return err;
  //     }),
  // Axios.get(`${BASE_URL}/getPollsReportByCompany/${id}`, {
  //   responseType: 'blob',
  //   headers: {
  //     ...HEADERS,
  //     // 'Content-Type': `multipart/form-data;`,
  //     // 'content-type': 'application/vnd.ms-excel;charset=UTF-8',
  //   },
  // })
  //   .then((res) => {
  //     // console.log('res', res);
  //     return res;
  //   })
  //   .catch((err) => {
  //     console.log('err', err);
  //     return err;
  //   }),
};
