const fs = require("fs");
const request = require("request");
const sharp = require("sharp");
const path = require("path");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/imgdown", requireLogin, (req, res) => {
    const download = (uri, filename, callback) => {
      request.head(uri, function(err, res, body) {
        request(uri)
          .pipe(fs.createWriteStream(filename))
          .on("close", callback);
      });
    };

    download(req.body.url, req.userId + ".png", () => {
      var pat = path.join(__dirname, "../" + req.userId + ".png");
      sharp(pat)
        .resize(50)
        .toBuffer((err, val) => {
          res.type("image/png");
          res.send(val);
          fs.unlink(pat, err => {
            if (err) throw err;
          });
        });
    });
  });
};
