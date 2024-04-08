const jose = require("jose");

const createToken = async (payload) => {
  const alg = "HS256";
  const secret = new TextEncoder().encode("secret");
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secret);

  return jwt;
};

const verifyToken = async (token) => {
  const payload = await jose.JWT.verify(token, process.env.JWT_SECRET);
  return payload;
};

module.exports = { createToken, verifyToken };
