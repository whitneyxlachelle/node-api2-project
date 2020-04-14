const express = require('express');
const db = require('../data/db.js');

// Creates another router 
const router = express.Router();

// Returns an array of all the post objects contained in the database.
router.get("/", (req, res) => {
    db.find()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                error: "The posts information could not be retrieved.",
            })
        })
})

// `GET` request to `/api/posts/:id`
// This is how Express gives us access to route parameters. 
// So if a route is defined as /users/:id, 
// and someone makes a GET request to /users/1, then req.params.id == 1 
router.get("/:id", (req, res) => {
    db.findById(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist.",
                })
            }
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                error: "The post information could not be retrieved.",
            })
        })
})

// `POST` request to /api/posts
// Use 'return' to cancel the request
router.post("/", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({
            errorMessage: "Please provide title and contents for the post.",
        })
    }
    db.insert(req.body)
        .then((post) => {
            res.status(201).json(post);
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                error: "There was an error while saving the post to the database",
            })
        })
})

// After the route has been fully configured, we export it so it can be required where needed
module.exports = router;