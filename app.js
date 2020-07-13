//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent =
  "This is the home page. Click on Compose to get redirected to another page. Where you can add new posts. Click on About to know about the Developer or you can click on contact to contact him.";
const aboutContent =
  "I'm a freshman in college doing B.Tech in Information Technology. Well, I started learning java when I was barely 14 years old. Being a tech enthusiast, I always try to keep myself updated with new trends in the programming world. I have a keen interest towards learning new concepts. Besides Java, I know Python, JavaScript , Dart and C-Programming as other programming Languages. I have my interest towards Application Development by using Flutter and Web development(MERN Stack). I'm sincere towards my work and looking for new learning opportunities. Yeah, and I have interest towards augmented reality would love to have a deep dive into this field. ";
const contactContent =
  "LinkedIn = www.linkedin.com/in/rohan-roy-chowdhury-884619187/ Instagram = https://www.instagram.com/rohan._23_/  Github= https://github.com/Rohan2309";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", function (req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts,
  });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };

  posts.push(post);

  res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
