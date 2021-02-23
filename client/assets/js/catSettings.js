
const colors = Object.values(allColors())

const defaultDNA = {
    "headColor" : 10,
    "mouthColor" : 13,
    "eyesColor" : 96,
    "earsColor" : 10,
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationMidColor" : 13,
    "decorationSidesColor" : 13,
    "animation" :  1,
    "lastNum" :  1
    }

// when page load
$( document ).ready(function() {

  getDefaultKittie()

});

function getDefaultKittie() {
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

  renderCat(defaultDNA)
}

function getRandomKittie() {

  const newDNA = {
    "headColor" : getRandomIntegerBetween(10, 98),
    "mouthColor" : getRandomIntegerBetween(10, 98),
    "eyesColor" : getRandomIntegerBetween(10, 98),
    "earsColor" : getRandomIntegerBetween(10, 98),
    //Cattributes
    "eyesShape" : getRandomIntegerBetween(1, 10),
    "decorationPattern" : getRandomIntegerBetween(1, 10),
    "decorationMidColor" : getRandomIntegerBetween(10, 98),
    "decorationSidesColor" : getRandomIntegerBetween(10, 98),
    "animation" :  getRandomIntegerBetween(1, 10),
    "lastNum" :  getRandomIntegerBetween(1, 10)
  }

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

  renderCat(newDNA)
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

    return parseInt(dna)
}

function renderCat(dna){

    headColor(colors[dna.headColor],dna.headColor)
    $('#bodycolor').val(dna.headColor)
    mouthChestTailColor(colors[dna.mouthColor],dna.mouthColor)
    $('#mouthcolor').val(dna.mouthColor)
    eyesColor(colors[dna.eyesColor],dna.eyesColor)
    $('#eyecolor').val(dna.eyesColor)
    earsPawsColor(colors[dna.earsColor],dna.earsColor)
    $('#earcolor').val(dna.earsColor)
    eyeVariation(dna.eyesShape)
    $('#eyeshape').val(dna.eyesShape)
    decorationVariation(dna.decorationPattern)
    $('#decorativepattern').val(dna.decorationPattern)
    innerDecorationColor(colors[dna.decorationMidColor],dna.decorationMidColor)
    $('#innerDecorationColor').val(dna.decorationMidColor)
    outerDecorationColor(colors[dna.decorationSidesColor],dna.decorationSidesColor)
    $('#outerDecorationColor').val(dna.decorationSidesColor)
    animationVariation(dna.animation)
    $('#animation').val(dna.animation)
}

// Changing cat attributes (colors, eyes, patterns)
$('#bodycolor').change(()=>{
    const colorVal = $('#bodycolor').val()
    headColor(colors[colorVal],colorVal)
})
$('#mouthcolor').change(()=>{
  const colorVal = $('#mouthcolor').val()
  mouthChestTailColor(colors[colorVal],colorVal)
})
$('#eyecolor').change(()=>{
  const colorVal = $('#eyecolor').val()
  eyesColor(colors[colorVal],colorVal)
})
$('#earcolor').change(()=>{
  const colorVal = $('#earcolor').val()
  earsPawsColor(colors[colorVal],colorVal)
})
$('#eyeshape').change(()=>{
  const shape = parseInt($('#eyeshape').val())
  eyeVariation(shape)
})
$('#decorativepattern').change(()=>{
  const pattern = parseInt($('#decorativepattern').val())
  decorationVariation(pattern)
})
$('#innerDecorationColor').change(()=>{
  const colorVal = $('#innerDecorationColor').val()
  innerDecorationColor(colors[colorVal],colorVal)
})
$('#outerDecorationColor').change(()=>{
  const colorVal = $('#outerDecorationColor').val()
  outerDecorationColor(colors[colorVal],colorVal)
})
$('#animation').change(()=>{
  const animationValue = parseInt($('#animation').val())
  animationVariation(animationValue)
})


