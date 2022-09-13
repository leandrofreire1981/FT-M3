// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests
let nextId = 1
server.post('/posts', (req, res) => {
    const { author, title, contents } = req.body
    if (!author || !title || !contents)
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    
        const newPost = {id: nextId, author, title, contents}
        posts.push(newPost)
        nextId++
        res.json(newPost)
})

server.post('/posts/author/:author', (req, res) => {
    const { title, contents } = req.body

    if(!req.params.author || !title || !contents)
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para crear el Post"})

        const newPost = {id: nextId, author: req.params.author, title, contents}
        posts.push(newPost)
        nextId++
        res.json(newPost)
    
server.get('/posts', (req, res) => {
    if(req.query.term){
        let aux = posts.filter(res => res.title.includes(req.query.term) || res.contents.includes(req.query.term))
        return res.json(aux)
    }

    return res.json(posts)
}) 

server.get('/posts/:author', (req, res) => {
    let { author } =req.params
    let aux = posts.filter(res => res.author===author)
    if(aux.length===0)
        return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
    
        return res.json(aux)
})



})
module.exports = { posts, server };
