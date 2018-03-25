const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  morgan("combined", {
    stream: fs.createWriteStream("./access.log", { flags: "a" })
  })
);

require("./models/User");
if (process.env.NODE_ENV === "test") {
  require("./services/dbconn-test");
} else {
  require("./services/dbconn");
}
require("./routes/authRoutes")(app);
require("./routes/jsonpatch")(app);
require("./routes/imgdown")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

module.exports = app;
