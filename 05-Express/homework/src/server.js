// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

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

server.get('/posts/:author/:title', (req, res) => {
    const { author, title } = req.params
    let a = posts.filter(r => r.author===author && r.title===title)
       
    if(!a.length)
        return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"})
    
    res.json(a)
}) 

server.put('/posts', (req, res) => {
    const { id, title, contents } = req.body
    if(!id || !title || !contents)
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})

    let aux = posts.map(r => {
        if(r.id===id){
            r.title=title
            r.contents=contents
            return res.json(r)
        }
    })
 
    return res.status(STATUS_USER_ERROR).json({error: "El id no corresponde con un Post existente"})
}) 

server.delete('/posts', (req, res) => {
    const { id } = req.body
    if(!id)
        return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})

    let aux = posts.filter(r => r.id===id)

    if(!aux.length)
        return res.status(STATUS_USER_ERROR).json({error: "Mensaje de error"})

    posts.splice(aux.id, 1)
    res.json({ success: true })
})

server.delete('/author', (req, res) => {
    const { author } = req.body
    const aux = posts.filter(r => r.author===author)
    if(!aux.length)
        return res.status(STATUS_USER_ERROR).json({"error": "No existe el autor indicado"})
    
    posts = posts.filter(r => r.author!==author)
    res.json(aux)
})
})
module.exports = { posts, server };
