import express from "express";

console.log("starting");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({ message: "hello world!" });
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
