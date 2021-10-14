var express = require("express");
var router = express.Router();
const threads = require("../controllers/Thread.controller.js");

/* GET users listing. */
router.post("/create", threads.create);

router.get("/", threads.findAll);

router.post("/create-comment", threads.createComment);

router.post("/like", threads.createLike);

module.exports = router;
