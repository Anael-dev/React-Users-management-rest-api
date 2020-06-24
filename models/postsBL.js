const postsDAL = require("../DAL/postsDAL");
const Post = require("./postModel");

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    Post.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.getPosts = async () => {
  const response = await postsDAL.getAll();
  return response;
};

exports.getById = (id) => {
  return new Promise((resolve, reject) => {
    Post.findById(id, function (err, post) {
      if (err) {
        reject(err);
      } else {
        resolve(post);
      }
    });
  });
};

exports.deletePost = (id) => {
  return new Promise((resolve, reject) => {
    Post.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("deleted");
      }
    });
  });
};

exports.postPost = (reqBody) => {
  const newPost = new Post(reqBody);
  return new Promise((resolve, reject) => {
    newPost.save(function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.editPost = (id, reqBody) => {
  return new Promise((resolve, reject) => {
    Post.findByIdAndUpdate(id, reqBody, function (err, post) {
      if (err) {
        reject(err);
      } else {
        resolve(post);
      }
    });
  });
};
