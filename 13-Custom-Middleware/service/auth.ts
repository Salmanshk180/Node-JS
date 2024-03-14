const jwt = require("jsonwebtoken");
interface User {
  id: string;
  email: string;
  password: string;
  role: string;
}

export function setUser(user: User) {
  return jwt.sign(user,  process.env.SECRET_KEY);
}

export function getUser(token: string): User | null {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded as User;
  } catch (err: any) {
    console.error("JWT Verification Error:", err.message);
    return null;
  }
}
