import moment from 'moment';

export default {
  jsonArrayToArray: (jsonArray) => {
    var res = [];

    // res.push(Object.keys(jsonArray[0]));

    jsonArray.map((item, i) => {
      var row = [];
      for (var i in item) {
        if (moment(item[i]).isValid() == true && typeof item[i] == 'string') {
          item[i] = moment(item[i]).format('DD-MM-YYYY, hh:mm a');
        }
        row.push(item[i]);
      }
      res.push(row);
    });

    return res;
  },

  isNullOrEmpty: (item) => item == null || item == undefined || item == '',
};
