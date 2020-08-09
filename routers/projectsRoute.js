const express = require("express");
const projectsBL = require("../models/projectsBL");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const projects = await projectsBL.getAll();
    res.json(projects);
  } catch (err) {
    res.send(err);
  }
});

router.route("/:id").get(async (req, res) => {
  const id = req.params.id;
  try {
    const Project = await projectsBL.getById(id);
    res.json(Project);
  } catch (err) {
    res.send(err);
  }
});

router.route("/:id").delete(async (req, res) => {
  const id = req.params.id;
  try {
    const project = await projectsBL.deleteProject(id);
    res.json(project);
  } catch (err) {
    res.send(err);
  }
});

router.route("/").post(async (req, res) => {
  try {
    const newProject = await projectsBL.postProject(req.body);
    res.json(newProject);
  } catch (err) {
    res.send(err);
  }
});

router.route("/addUser/:id").put(async (req, res) => {
  const id = req.params.id;
  try {
    const updatedProject = await projectsBL.addProjectUser(id, req.body);
    res.json(updatedProject);
  } catch (err) {
    res.send(err);
  }
});

router.route("/removeUser/:id").put(async (req, res) => {
  const id = req.params.id;
  try {
    const updatedProject = await projectsBL.removeProjectUser(id, req.body);
    res.json(updatedProject);
  } catch (err) {
    res.send(err);
  }
});

router.route("/:id").put(async (req, res) => {
  const id = req.params.id;
  try {
    const updatedProject = await projectsBL.editProject(id, req.body);
    res.json(updatedProject);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
