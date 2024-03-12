import express from "express";
const app = express();
const fs = require("fs");
interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  job_title: string;
}
const users = require("./MOCK_DATA.json");

app.use(express.urlencoded({ extended: false }));
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile(
    "./MOCK_DATA.json",
    JSON.stringify(users),
    (err: NodeJS.ErrnoException, result: Buffer) => {
      return res.json({ id: users.length });
    }
  );
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const data: User = users.find((u: User) => u.id === id);
  if (!data) {
    return res.json("User not found");
  }
  return res.json(data);
});

app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  let userIndex = users.findIndex((u: User) => u.id === id);
  users[userIndex] = { ...body, id: userIndex + 1 };
  fs.writeFile(
    "./MOCK_DATA.json",
    JSON.stringify(users),
    (err: NodeJS.ErrnoException, data: Buffer) => {
      return res.json(users[userIndex]);
    }
  );
});

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const filteredUser = users.filter((user: User) => user.id !== id);
  fs.writeFile(
    "./MOCK_DATA.json",
    JSON.stringify(filteredUser),
    (err: NodeJS.ErrnoException, data: Buffer) => {
      return res.json(id);
    }
  );
});

app.listen(8000, () => console.log("Server is listening on port 8000"));
