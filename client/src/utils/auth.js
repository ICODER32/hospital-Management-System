import * as jose from "jose";

const verifyauth = async () => {
  const token = localStorage.getItem("token");
  const secret = new TextEncoder().encode("secret");
  try {
    const { payload } = await jose.jwtVerify(token, secret);

    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return false;
    } else {
      return {
        username: payload.firstName + " " + payload.lastName,
        email: payload.email,
        id: payload.id,
        role: payload.role,
      };
    }
  } catch (error) {
    return false;
  }
};

export default verifyauth;
