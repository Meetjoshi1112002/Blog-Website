// REST API for our blog website:

import express from "express";
import bodyParser from "body-parser";
import data, { port } from "./data.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// data structures for the post:
let posts = [];

// class post with contructor:
function Post(title, content) {
  this.title = title;
  this.content = content;
  this.rawDate = new Date();
  this.date = this.rawDate.toLocaleString();
}

// Add the post:
const addPost = (title, content) => {
  let post = new Post(title, content);
  posts.push(post);
};

// delete post
const delPost = (index) => {
  posts.splice(index, 1);
};

// Edit post:
const editPost = (index, content, title) => {
  if (posts[index]) {
    posts[index] = new Post(title, content);
  }
};

// GET EndPoint:
app.get("/", (req, res) => {
  res.json(posts);
});

// Get by a particular id:
app.get("/blog/:id", (req, res) => {
  const post = posts[parseInt(req.params.id)];
  res.json(post);
});

// Post Request:
app.post("/createPost", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  addPost(title, content);
  res.json("Added");
});

// Patch
app.patch("/update",(req,res)=>{
        const title = req.body.title;
        const content = req.body.content;
        const id = req.body.postId;
        editPost(id,content,title);
        res.json("Updated");
})

// Delete Request:
app.delete("/delete/:id",(req,res)=>{
    delPost(parseInt(req.params.id));
    res.json("DELETED");
})

app.listen(port, () => {
  console.log(`I am at ${port}`);
  data.forEach((ele) => {
    addPost(ele.title, ele.content);
  });
});
