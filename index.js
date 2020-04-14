const express = require("express");
const postsRouter = require('./posts/posts-router');

const server = express();
const port = 3000;

server.use(express.json());
server.use("/posts", postsRouter);

server.get('/', (req, res) => {
    res.send('Blog API is running!')
})

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});