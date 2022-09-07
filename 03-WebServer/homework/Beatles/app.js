var http = require('http');
var fs   = require('fs');

var beatles=[{
  id: 0,
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  id: 1,
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  id: 2,
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  id: 3,
  name: "Ringo Starr",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]


http.createServer((request, resolve) => {
  let ban = 0
  if(request.url==='/api') {
    ban=1
   resolve.writeHead(200, {'contentType': 'aplication/json'})
   resolve.end(JSON.stringify(beatles))
  }
  
  let urlWeb = request.url.replace('%20', ' ')
  beatles.map(res => {
    if('/api/'+ res.name===urlWeb) {
        resolve.writeHead(200, {'contentType': 'aplication/json'})
        ban=1
        resolve.end(JSON.stringify(res))
      }
  })

  
  urlWeb = request.url.replace('%20', ' ').slice(1)
  beatles.map(res => {
    if(res.name===urlWeb) {
      resolve.writeHead(200, {'contentType': 'text/html'})
      ban=1
      file = fs.readFileSync(`${__dirname}/beatle.html`, 'utf-8')
      
      file = file.replace(/{fullName}/g, res.name)
      //console.log(file)
      file =file.replace('{image}', res.profilePic)
      file = file.replace('{birth}', res.birthdate) 
      resolve.end(file)
    }
  })
  
  if(request.url==='/') {
    resolve.writeHead(200, {'contentType': 'text/html'})
    ban=1
    file = fs.readFileSync(`${__dirname}/index.html`, 'utf-8')
    resolve.end(file)
  }
  




  if (ban===0) {
    resolve.writeHead(404, {'contentType': 'text/plain'})
    resolve.end('No es una ruta valida')
  }

  
  
  
/*   else if() {
      resolve.writeHead(200, {'contentType': 'image/jpeg')
      
      imagen = fs.readFileSync(__dirname + command[request.url.slice(1)].payload)
      
      resolve.end(imagen)
  }
  else {
      resolve.writeHead(404, {'contentType': 'text/plain'})
      resolve.end('No es una ruta valida')
  } */
}).listen(1337, '127.0.0.1')
