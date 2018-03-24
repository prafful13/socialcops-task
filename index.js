const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./models/User");
require("./services/dbconn");

require("./routes/userController")(app);
require("./routes/authRoutes")(app);
require("./routes/jsonpatch")(app);
require("./routes/imgdown")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
