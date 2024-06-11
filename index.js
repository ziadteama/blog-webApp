import express from "express";
import bodyParser from "body-parser";
import { AvatarGenerator } from "random-avatar-generator";

const generator = new AvatarGenerator();
const app = express();
const port = 3000;
var name;
var avatar;
var blogs = [{ id: 0, text: 1 },{ id: 1, text: 2 },{ id: 2, text: 3 },{ id: 3, text: 4 },{ id: 4, text: 5 },];
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("Signin.ejs");
});

app.post("/home", (req, res) => {
  name = req.body["userName"];
  avatar = generator.generateRandomAvatar();
  let data = {
    randomAvatar: avatar,
    userName: name,
  };
  res.render("home.ejs", data);
});
app.get("/home", (req, res) => {
  let data = {
    randomAvatar: avatar,
    userName: name,
  };
  res.render("home.ejs", data);
});
app.post("/save", (req, res) => {
  const id = blogs.length + 1;
  let blogWritten = { id: id, text: req.body.postArea };
  if (blogWritten) blogs.push(blogWritten);
  const dataForPosts = {
    userBlog: blogs,
  };
});

app.get("/posts", (req, res) => {
  let data = {
    randomAvatar: avatar,
    userName: name,
    userBlog: blogs,
  };
  res.render("posts.ejs", data);
});
app.post("/deletepost", (req, res) => {
  const id = parseInt(req.body.id, 10);
  blogs = blogs.filter(post => post.id !== id);
  res.redirect("/posts")
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});