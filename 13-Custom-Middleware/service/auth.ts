const jwt = require("jsonwebtoken");
const {secret_key} = require("../controllers/key"); 
interface User {
  id: string;
  email: string;
  password: string;
}

export function setUser(user: User) {
  return jwt.sign(user, secret_key);
}

export function getUser(token: string): User | null {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, secret_key);
    return decoded as User;
  } catch (err: any) {
    console.error("JWT Verification Error:", err.message);
    return null;
  }
}
