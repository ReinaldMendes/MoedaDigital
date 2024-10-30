import jsonwebtoken from "jsonwebtoken";

const generateAcessToken = (user) =>
  jsonwebtoken.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_PRIVATE_KEY,
    {
      expiresIn: "1d",
    }
  );
const verifyAcessToken = (token) =>
  jsonwebtoken.verify(token, process.env.JWT_PRIVATE_KEY);
export default { generateAcessToken, verifyAcessToken };
