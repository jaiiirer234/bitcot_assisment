import jwt from "jsonwebtoken";
const secret = process.env.Jwt_secret || "secret!@#$%^&*(";

export const createToken = (userId: string) => {
  jwt.sign({ id: userId }, secret, { expiresIn: "1h" });
};
export const verifyToken = (token: string) => {
  jwt.verify(token, secret);
};
