const express = require("express");
const membersBL = require("../models/membersBL");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const members = await membersBL.getAll();
    res.json(members);
  } catch (err) {
    res.send(err);
  }
});

router.route("/:id").get(async (req, res) => {
  const id = req.params.id;
  try {
    const member = await membersBL.getById(id);
    res.json(member);
  } catch (err) {
    res.send(err);
  }
});

router.route("/:id").delete(async (req, res) => {
  const id = req.params.id;
  try {
    const member = await membersBL.deleteMember(id);
    res.json(member);
  } catch (err) {
    res.send(err);
  }
});

router.route("/").post(async (req, res) => {
  try {
    const newMember = await membersBL.postMember(req.body);
    res.json(newMember);
  } catch (err) {
    res.send(err);
  }
});

router.route("/:id").put(async (req, res) => {
  const id = req.params.id;
  try {
    const updatedMember = await membersBL.editMember(id, req.body);
    res.json(updatedMember);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
