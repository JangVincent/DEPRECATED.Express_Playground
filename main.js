const express = require("express");
const app = express();

const port = 3000;

let posts = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json(posts);
});

app.post("/posts", (req, res) => {
  const { title, name, text } = req.body;

  posts.push({
    id: posts.length + 1,
    title,
    name,
    text,
    createdAt: new Date(),
  });

  res.json(posts[posts.length - 1]);
});

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;

  const filteredPosts = posts.filter((post) => {
    return post.id !== +id;
  });
  console.log(id)

  console.log(filteredPosts)
  if (filteredPosts.length !== posts.length) {
    posts = filteredPosts;
    res.json("OK");
    return;
  }

  res.json("NOT CHANGED");
});

app.listen(port, () => {
  console.log("Start Express server : use " + port);
});
