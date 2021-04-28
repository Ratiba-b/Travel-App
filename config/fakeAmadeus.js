const fs = require("fs");

const rawdata = fs.readFileSync("response.json");

module.exports = {
  fakeFlights: function () {
    return { body: rawdata };
  },
};
