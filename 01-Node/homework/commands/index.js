var fs = require('fs');

module.exports = {
 pwd: function(print) {
    print('path: ')
    print(process.mainModule.path)
 },
 date: function(print) {
    print('Hoy es: ')
    print(Date())
 },
 ls: function(print) {
    fs.readdir('.', function(err, data) {
        if(err) throw err
        print(data.join('\n'))
        print('\nLeandro > ')
    })
 },
 echo: function(print, args) {
    print(args.join('\n'))    
 },
 cat: function(print, file) {
    let data
    data = fs.readFileSync(file[0], 'utf-8')
    print(data)
 },
 head: function(print, file) {
    fs.readFile(file[0], 'utf8', function(err, data) {
        if(err) throw err;
        print(data.split('\n').splice(0, 5).join('\n'))
        
    })
        
    
 }
}