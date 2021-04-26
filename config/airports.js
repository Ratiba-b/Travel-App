const fs = require("fs");

const rawdata = fs.readFileSync("france.json");
const airports = JSON.parse(rawdata);

module.exports = {
  airportList: function () {
    return airports;
  },
};
