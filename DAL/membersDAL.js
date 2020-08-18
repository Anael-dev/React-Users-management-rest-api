const axios = require("axios");

exports.getAvatarImg = async (id, name) => {
  try {
    // const response = await axios.get("https://tinyfac.es/api/users");
    // return response.data[id].avatars[0].url;
    const response = await axios.get("https://randomuser.me/api/?inc=picture");
    return response.data.results[0].picture.medium;
  } catch (err) {
    console.log(err);
    const userImg = `https://ui-avatars.com/api/?background=4591af&color=fff&name=${
      name.split(" ")[0]
    }+${name.split(" ")[1]}`;
    return userImg;
  }
};

exports.getAll = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return await Promise.all(
    response.data.map(async (x) => {
      return {
        id: x.id,
        name: x.name,
        email: x.email,
        address: {
          city: x.address.city,
          street: x.address.street,
        },
        avatar:
          //  `https://i.pravatar.cc/150?img=${
          //   x.id
          // }`
          await this.getAvatarImg(x.id, x.name),
      };
    })
  );
};
