'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:


function $Promise(executor)  {
    if(typeof executor !== 'function')
        throw TypeError('executor must be a function')
    this._state = 'pending'
    this._handlerGroups = []
   // this._callHandlers.bind(this)
    executor(this._internalResolve.bind(this), this._internalReject.bind(this))
}


$Promise.prototype._internalResolve = function(data)  {
  if(this._state==='pending') {
    this._state = 'fulfilled'
    this._value = data
    this._callHandlers()
  }
}

$Promise.prototype._internalReject = function(reson) {
    if(this._state === 'pending') {
        this._state='rejected'
        this._value=reson
        this._callHandlers()
      }    
    }

    
    $Promise.prototype._callHandlers = function() {
      while(this._handlerGroups.length) {
        const hand = this._handlerGroups.shift()
        if(this._state === 'fulfilled') {
          if(hand.successCb) {
            hand.successCb(this._value)
          }
        }
        if(this._state === 'rejected'){
          if(hand.errorCb){
            hand.errorCb(this._value)
          }
        }
      }
    }
    
    $Promise.prototype.then = function(s1, e1) {
      if(typeof s1 !== 'function' && typeof e1 !== 'function') {
        s1 = e1 = false
      }
      this._handlerGroups.push({
        successCb: s1,
        errorCb: e1
      })      
      if(this._state!=='pending') this._callHandlers()
    }

    $Promise.prototype.catch = function(func) {
      this.then(null, func)
    }

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/