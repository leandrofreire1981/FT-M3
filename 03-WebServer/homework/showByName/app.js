var fs  = require("fs")
var http  = require("http")
var command = require("./commands")

// Escribí acá tu servidor
http.createServer((request, resolve) => {
    if(request.url==='/') {
        resolve.writeHead(200, {'contentType': 'text/plain'})
        resolve.end('Hola mundo\n')
    }
    //console.log(command[request.url.slice(1)].type)
    else if(command[request.url.slice(1)].payload) {
        resolve.writeHead(200, {'contentType': command[request.url.slice(1)].type})
        if(command[request.url.slice(1)].type === 'image/jpeg') imagen = fs.readFileSync(__dirname + command[request.url.slice(1)].payload)
        else imagen=command[request.url.slice(1)].payload
        resolve.end(imagen)
    }
    else {
        resolve.writeHead(404, {'contentType': 'text/plain'})
        resolve.end('No es una ruta valida')
    }
}).listen(1337, '127.0.0.1')