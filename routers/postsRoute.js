const express = require("express");
const postsBL = require("../models/postsBL");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const posts = await postsBL.getAll();
    res.json(posts);
  } catch (err) {
    res.send(err);
  }
});

router.route("/:id").get(async (req, res) => {
  const id = req.params.id;
  try {
    const Post = await postsBL.getById(id);
    res.json(Post);
  } catch (err) {
    res.send(err);
  }
});

router.route("/:id").delete(async (req, res) => {
  const id = req.params.id;
  try {
    const post = await postsBL.deletePost(id);
    res.json(post);
  } catch (err) {
    res.send(err);
  }
});

router.route("/").post(async (req, res) => {
  try {
    const newPost = await postsBL.postPost(req.body);
    res.json(newPost);
  } catch (err) {
    res.send(err);
  }
});

router.route("/:id").put(async (req, res) => {
  const id = req.params.id;
  try {
    const updatedPost = await postsBL.editPost(id, req.body);
    res.json(updatedPost);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
