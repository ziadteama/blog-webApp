import express from "express";
import bodyParser from "body-parser";
import { AvatarGenerator } from "random-avatar-generator";

const generator = new AvatarGenerator();
const app = express();
const port = 3000;
var name;
var avatar;
var blogs = [];
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
    userName: name
  };
  res.render("home.ejs", data);
});
app.get("/home", (req, res) => {
   let data = {
     randomAvatar: avatar,
     userName: name
   };
   res.render("home.ejs", data);
 });
app.post("/save", (req, res) => {
  let blogWritten = req.body.postArea;
  if (blogWritten) blogs.push(blogWritten);
  const dataForPosts = {
    userBlog: blogs
  };
});

app.get("/posts", (req, res) => {
  let data = {
    randomAvatar: avatar,
    userName: name,
    userBlog: blogs
  };
  res.render("posts.ejs", data);
});


app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
