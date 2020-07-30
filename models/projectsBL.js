const projectsDAL = require("../DAL/projectsDAL");
const Project = require("./projectModel");

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    Project.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.getProjects = async () => {
  const response = await projectsDAL.getAll();
  return response;
};

exports.getById = (id) => {
  return new Promise((resolve, reject) => {
    Project.findById(id, function (err, project) {
      if (err) {
        reject(err);
      } else {
        resolve(project);
      }
    });
  });
};

exports.deleteProject = (id) => {
  return new Promise((resolve, reject) => {
    Project.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("deleted");
      }
    });
  });
};

exports.postProject = (reqBody) => {
  const newProject = new Project(reqBody);
  return new Promise((resolve, reject) => {
    newProject.save(function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.editProject = (id, reqBody) => {
  return new Promise((resolve, reject) => {
    Project.findByIdAndUpdate(id, reqBody, { new: true }, function (err, project) {
      if (err) {
        reject(err);
      } else {
        resolve(project);
      }
    });
  });
};
