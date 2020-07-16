import jwt from "jsonwebtoken";
import config from "./config";

const getToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: "48H",
    }
  );
};

export { getToken };
