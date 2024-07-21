import jwt from "jsonwebtoken";

export const setAuthTokenCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });

  const cookieOptions = {
    httpOnly: true,
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production" ? true : false,
  };

  res.cookie("token", token, cookieOptions);
};
