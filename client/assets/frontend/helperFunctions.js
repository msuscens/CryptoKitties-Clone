function getRandomIntegerBetween(low, high){
    try{
      if (low<0) throw "Error: Only supports positive integers - low is negative!"
      if (low>high) throw "Error: low is greater than high!"
  
      const rangeInclusive = high - low + 1 
      const RandomValue = Math.floor(Math.random() * rangeInclusive) + low
  
      return RandomValue
    }
    catch(err){
      console.log(`In getRandomIntegerBetween(${low}, ${high}): ${err}`)
    }
  }
  