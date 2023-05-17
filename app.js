import fsP from "node:fs/promises";

import express from "express";
const app = express()
const port = 3000

app.get('/status', (req, res) => {
    res.status(200).send('OK')
})

//  ==========================================

// app.get('/posts', async (req, res) => {
//     try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//         const json = await response.json();

//         res.send(json)
//     }
//     catch (err) {
//         console.error(err)
//     }
// })

// app.get(`/posts/:postId`, async (req, res) => {
//     // console.log(req.params);
//     let { postId } = req.params
//     try {
//         const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
//         const json = await response.json();

//         res.send(json)
//     }
//     catch (err) {
//         console.error(err)
//     }
// })

//  ==========================================

app.get('/posts', async (req, res) => {
    const posts = await fsP.readFile('./data/posts.json');
    res.send(JSON.parse(posts));
})

app.get(`/posts/:postId`, async (req, res) => {
    let { postId } = req.params
    const posts = await fsP.readFile('./data/posts.json');
    const parsedPosts = JSON.parse(posts);

    let filteredPosts = parsedPosts.filter((elt) => {
        return (
            elt.id === Number(postId)
        )
    })
    res.send(filteredPosts[0]);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})