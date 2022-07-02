//create token and save it in cookie
const sendToken = (user, statuscode, message, res) => {
  const token = user.getJWTtoken();

  //option for cookies
  const option = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 1 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res
    .status(statuscode)
    .cookie("token", token, option)
    .json({ message, success: true, user, token });
};

module.exports = sendToken;
