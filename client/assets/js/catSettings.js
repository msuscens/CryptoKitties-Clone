// When page loads
$( document ).ready(function() {
  getDefaultKittie()
});

function getDefaultKittie() {
  try {
    // Set DNA display (below the cat)
/*
    $('#dnabody').html(defaultDNA.headColor);
    $('#dnamouth').html(defaultDNA.mouthColor);
    $('#dnaeyes').html(defaultDNA.eyesColor);
    $('#dnaears').html(defaultDNA.earsColor);
    $('#dnashape').html(defaultDNA.eyesShape)
    $('#dnadecoration').html(defaultDNA.decorationPattern)
    $('#dnadecorationMid').html(defaultDNA.decorationMidColor)
    $('#dnadecorationSides').html(defaultDNA.decorationSidesColor)
    $('#dnaanimation').html(defaultDNA.animation)
    $('#dnaspecial').html(defaultDNA.lastNum)
*/
    renderCat(defaultDNA)
    updateSliders(defaultDNA)
  }
  catch (err)
  {
    console.log(`Error In getDefaultKittie(): ${err}`)
  }
}

function getRandomKittie() {
  try {
    const newDNA = {
      "headColor" : getRandomIntegerBetween(10, 98),
      "mouthColor" : getRandomIntegerBetween(10, 98),
      "eyesColor" : getRandomIntegerBetween(10, 98),
      "earsColor" : getRandomIntegerBetween(10, 98),
      //Cattributes
      "eyesShape" : getRandomIntegerBetween(0, 9),
      "decorationPattern" : getRandomIntegerBetween(0, 9),
      "decorationMidColor" : getRandomIntegerBetween(10, 98),
      "decorationSidesColor" : getRandomIntegerBetween(10, 98),
      "animation" :  getRandomIntegerBetween(0, 9),
      "lastNum" :  getRandomIntegerBetween(0, 9)
    }

    // Set DNA display (below the cat)
/*
    $('#dnabody').html( newDNA.headColor )
    $('#dnamouth').html( newDNA.mouthColor )
    $('#dnaeyes').html( newDNA.eyesColor )
    $('#dnaears').html( newDNA.earsColor )
    $('#dnashape').html( newDNA.eyesShape )
    $('#dnadecoration').html( newDNA.decorationPattern )
    $('#dnadecorationMid').html( newDNA.decorationMidColor )
    $('#dnadecorationSides').html( newDNA.decorationSidesColor )
    $('#dnaanimation').html( newDNA.animation )
    $('#dnaspecial').html( newDNA.lastNum )
*/
    renderCat(newDNA)
    updateSliders(newDNA)
  }
  catch (err)
  {
    console.log(`Error In getRandomKittie(): ${err}`)
  }
}

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

function getDna(){
  try{
    let dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationMid').html()
    dna += $('#dnadecorationSides').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    if (dna.length !== 16 ) throw `DNA string ('${dna}') length should be 16 (not ${dna.length} digits)`

    return BigInt(dna)
  }
  catch (err){
    console.log(`Error In getDna(): ${err}`)
  }
}

function renderCat(dna, idCat=""){
  try{
    headColor(dna.headColor, idCat)
    // headColor(colors[dna.headColor], dna.headColor, catId)

    mouthChestTailColor(colors[dna.mouthColor],dna.mouthColor, idCat)
    eyesColor(colors[dna.eyesColor],dna.eyesColor, idCat)
    earsPawsColor(colors[dna.earsColor],dna.earsColor, idCat)
    eyeVariation(dna.eyesShape, idCat)
    decorationVariation(dna.decorationPattern, idCat)
    innerDecorationColor(colors[dna.decorationMidColor],dna.decorationMidColor, idCat)
    outerDecorationColor(colors[dna.decorationSidesColor],dna.decorationSidesColor, idCat)
    animationVariation(dna.animation, idCat)

    // Update Special DNA digit  
    $(`${idCat} #dnaspecial`).html( dna.lastNum ) // Update DNA display (below cat)
  }
  catch (err){
    console.log(`Error In renderCat(dna): ${err}`)
  }
}

function updateSliders(dna){
  try{
    $('#bodycolor').val(dna.headColor)             //Update slider's value
    $('#headcode').html('code: '+dna.headColor)    //Update slider's badge

    $('#mouthcolor').val(dna.mouthColor)
    $('#mouthcode').html('code: '+dna.mouthColor)

    $('#eyecolor').val(dna.eyesColor)
    $('#eyescode').html('code: '+dna.eyesColor)

    $('#earcolor').val(dna.earsColor)
    $('#earscode').html('code: '+dna.earsColor)

    $('#eyeshape').val(dna.eyesShape)
    $('#eyeName').html(eyeVariations[dna.eyesShape].name)

    $('#decorativepattern').val(dna.decorationPattern)
    $('#decorationName').html(decorationVariations[dna.decorationPattern].name)

    $('#innerDecorationColor').val(dna.decorationMidColor)
    $('#innerDecorationCode').html('code: '+dna.decorationMidColor)

    $('#outerDecorationColor').val(dna.decorationSidesColor)
    $('#outerDecorationCode').html('code: '+dna.decorationSidesColor)

    $('#animation').val(dna.animation)
    $('#animationName').html(animationVariations[dna.animation].name)
  }
  catch (err){
    console.log(`Error In updateSliders(dna): ${err}`)
  }
}


// Slider changing cat attributes (colors, eyes, patterns)
$('#bodycolor').change(()=>{
    const colorVal = $('#bodycolor').val()
    $('#headcode').html('code: '+colorVal)    // Update slider's badge
    headColor(colorVal)      // Update cat
    // headColor(colors[colorVal],colorVal)      // Update cat
})

$('#mouthcolor').change(()=>{
  const colorVal = $('#mouthcolor').val()
  $('#mouthcode').html('code: '+colorVal)
  mouthChestTailColor(colors[colorVal],colorVal)
})

$('#eyecolor').change(()=>{
  const colorVal = $('#eyecolor').val()
  $('#eyescode').html('code: '+colorVal)
  eyesColor(colors[colorVal],colorVal)
})

$('#earcolor').change(()=>{
  const colorVal = $('#earcolor').val()
  $('#earscode').html('code: '+colorVal)
  earsPawsColor(colors[colorVal],colorVal)
})

$('#eyeshape').change(()=>{
  const shape = parseInt($('#eyeshape').val())
  $('#eyeName').html(eyeVariations[shape].name)
  eyeVariation(shape)
})

$('#decorativepattern').change(()=>{
  const pattern = parseInt($('#decorativepattern').val())
  $('#decorationName').html(decorationVariations[pattern].name)
  decorationVariation(pattern)
})

$('#innerDecorationColor').change(()=>{
  const colorVal = $('#innerDecorationColor').val()
  $('#innerDecorationCode').html('code: '+colorVal)
  innerDecorationColor(colors[colorVal],colorVal)
})

$('#outerDecorationColor').change(()=>{
  const colorVal = $('#outerDecorationColor').val()
  $('#outerDecorationCode').html('code: '+colorVal)
  outerDecorationColor(colors[colorVal],colorVal)
})

$('#animation').change(()=>{
  const animationValue = parseInt($('#animation').val())
  $('#animationName').html(animationVariations[animationValue].name)
  animationVariation(animationValue)
})


