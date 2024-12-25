const { sign } = require("jsonwebtoken");
// signing the access token
const createAccessToken = (id) => {
  return sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 15 * 60,
  });
};


// signing the email verification token
const createEmailVerifyToken = (id) => {
  return sign({ id }, process.env.VERIFY_TOKEN_SECRET, {
    expiresIn: 15 * 60, // 15 minutes
  });
};


// signing the refresh token
const createRefreshToken = (id) => {
  return sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d", // 30 days
  });
};

// signing the password reset token
const createPasswordResetToken = (user) => {
  const {email, _id, password} = user
  const secret = password;
  return sign({ id: _id, email }, secret, {
    expiresIn: 15 * 60, // 15 minutes
  });
};

// sending the access token to the client
const sendAccessToken = (_req, res, accesstoken) => {
  res.json({
    accesstoken,
    message: "Sign in Successful 🥳",
    type: "success",
  });
};

const sendVerifyToken = (_req, res, accesstoken) => {
  res.json({
    accesstoken,
    message: "Verification Successful",
    type: "success",
  });
};

// sending the refresh token to the client as a cookie
const sendRefreshToken = (res, refreshtoken) => {
  res.cookie("refreshtoken", refreshtoken, {
    httpOnly: true,
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  createEmailVerifyToken,
  createPasswordResetToken,
  sendAccessToken,
  sendRefreshToken,
  sendVerifyToken,
};