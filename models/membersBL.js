const membersDAL = require("../DAL/membersDAL");
const Member = require("./memberModel");

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    Member.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.getMembers = async () => {
  const response = await membersDAL.getAll();
  return response;
};

exports.getById = (id) => {
  return new Promise((resolve, reject) => {
    Member.findById(id, function (err, member) {
      if (err) {
        reject(err);
      } else {
        resolve(member);
      }
    });
  });
};

exports.deleteMember = (id) => {
  return new Promise((resolve, reject) => {
    Member.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("deleted");
      }
    });
  });
};

exports.postMember = (reqBody) => {
  const newMember = new Member(reqBody);
  return new Promise((resolve, reject) => {
    newMember.save(function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.editMember = (id, reqBody) => {
  return new Promise((resolve, reject) => {
    Member.findByIdAndUpdate(id, reqBody, { new: true }, function (
      err,
      member
    ) {
      if (err) {
        reject(err);
      } else {
        resolve(member);
      }
    });
  });
};
