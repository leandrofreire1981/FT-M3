const commands = require('./commands/index');

function print(data) {
  if(data) process.stdout.write(data)
}
process.stdout.write('\nLeandro > ')

 // El evento stdin 'data' se dispara cuando el user escribe una línea
 print()
 process.stdin.on('data', function (data) {
   var cmd = data.toString().trim()// remueve la nueva línea
  
   var args = cmd.split(' ')  
   cmd = args.shift()
   
   
  if(commands[cmd]) commands[cmd](print, args)
  else print('Comando no encontrado')

  print('\nLeandro > ');
 });