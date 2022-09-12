var express = require('express')
 var app = express()

 app.get('/', (req, res) => {
    console.log('Estas en /')
    res.send('estas en /')
 })

 app.get('/html', (req, res) => {
    console.log('estas en html')
    var img = 'https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg'
    res.send(`<img src=${img} alt=no_se_encuentra />`)
 })

 app.get('/obj', (req, res) => {
    console.log('estoy en obj')
    const obj = {nombre: 'Leandro', apellido: 'Freire'}
    res.send(obj)
 })
app.listen(3000)