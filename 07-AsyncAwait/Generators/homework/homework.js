function* fizzBuzzGenerator(max) {
  // Tu código acá:
  if (!max)
    max='infinito'
  console.log('arranca')
  let count = 1
  let divisor3
  let divisor5
  let mensaje
  while(max==='infinito' || count <= max)
  {
    divisor3 = count % 3
    divisor5 = count % 5
    if(divisor3===0 && divisor5===0)
      mensaje = 'Fizz Buzz'
    if(divisor3===0 && divisor5!==0)
      mensaje = 'Fizz'
    if(divisor3!==0 && divisor5===0)
      mensaje = 'Buzz'
    if(divisor3!==0 && divisor5!==0)
      mensaje = count
    
    yield mensaje
    count++
  } 
  
  
}

module.exports = fizzBuzzGenerator;
