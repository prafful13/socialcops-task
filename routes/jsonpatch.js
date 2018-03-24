const jsonpatch = require("jsonpatch");
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/jsonpatch", requireLogin, (req, res) => {
    console.log(req.body[0], req.body[1]);
    const patcheddata = jsonpatch.apply_patch(req.body[0], req.body[1]);
    res.status(200).send(patcheddata);
  });
};
