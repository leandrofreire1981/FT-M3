var fs = require('fs');

var dir = '/images/'
var d = '_doge.jpg'
module.exports = {
    arcoiris: { payload: dir + 'arcoiris' + d, type: 'image/jpeg'},
    badboy: { payload: dir + 'arcoiris' + d, type: 'image/jpeg'},
    code: { payload: dir + 'arcoiris' + d, type: 'image/jpeg'},
    resaca: { payload: dir + 'arcoiris' + d, type: 'image/jpeg'},
    retrato: { payload: dir + 'arcoiris' + d, type: 'image/jpeg'},
    sexy: { payload: dir + 'arcoiris' + d, type: 'image/jpeg'},

    home: { payload: 'Este es el Home', type: 'text/plain'},
    info: { payload: 'Servido para mostrar imagenes', type: 'text/plain'}
}