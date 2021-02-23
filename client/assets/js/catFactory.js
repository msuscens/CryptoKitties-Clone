
//Random color
function getColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    const colors = []
    for(const i = 10; i < 99; i ++){
      const color = getColor()
      colors[i] = color
    }
    return colors
}

function headColor(color,code) {
    $('.cat__head, .cat__chest').css('background', '#' + color) //Change cat color
    $('#headcode').html('code: '+code)    //Update sliders badge text
    $('#dnabody').html(code)              //Update the body color DNA part (displayed below the cat)
}

function mouthChestTailColor(color,code) {
    $('.cat__mouth-contour, .cat__chest_inner, .cat__tail').css('background', '#' + color)
    $('#mouthcode').html('code: '+code)
    $('#dnamouth').html(code)
}

function eyesColor(color,code) {
    $('[class^="pupil-"]').css('background', '#' + color)  
    $('#eyescode').html('code: '+code)
    $('#dnaeyes').html(code)
}

function earsPawsColor(color,code) {
    $('[id$="Ear"], [class^="cat__paw"]').css('background', '#' + color)
    $('#earscode').html('code: '+code)
    $('#dnaears').html(code)
}

function innerDecorationColor(color,code) {
    $('.cat__head-dots').css('background', '#' + color) 
    $('#innerDecorationCode').html('code: '+code)
    $('#dnadecorationMid').html(code)
}

function outerDecorationColor(color,code) {
    $('[class^="cat__head-dots_"]').css('background', '#' + color)     
    $('#outerDecorationCode').html('code: '+code)
    $('#dnadecorationSides').html(code)
}

function eyeVariation(num) {
    $('#dnashape').html(num)
    switch (num) {
        case 1:
            normalEyes()
            $('#eyeName').html('Big Round Eyes')  //Set the badge
            break
        case 2:
            normalEyes()  //Reset eyes
            $('#eyeName').html("Look Down") 
            eyesType1()  
            break
        case 3:
            normalEyes()  
            $('#eyeName').html("Look Up")
            eyesType2()  
            break
        case 4:
            normalEyes() 
            $('#eyeName').html("Narrow pupils")
            eyesType3()
            break
        case 5:
            normalEyes()  
            $('#eyeName').html("Narrow pupils, looking left")
            eyesType4()  
            break
        case 6:
            normalEyes() 
            $('#eyeName').html("Narrow pupils, looking right")
            eyesType5() 
        break
        case 7:
            normalEyes()  
            $('#eyeName').html("Cross-eyed")
            eyesType6()  
        break
        case 8:
            normalEyes()  
            $('#eyeName').html("Lazy left-eye")
            eyesType7()  
        break
        case 9:
            normalEyes() 
            $('#eyeName').html("Lazy right-eye")
            eyesType8()  
        break
        case 10:
            normalEyes() 
            $('#eyeName').html("Two lazy eyes")
            eyesType9()  
        break
        default:
            console.log(`eyeVariation(${num}): Unexpected parameter number`)
        break
    }
}

function normalEyes() {
    // Reset eye lids to fully open
    $('.cat__eye').find('span').css('border', 'none')

    // Reset pupil to round and centered
    $('.cat__eye').find('span').css('width', '42px') 
    $('.pupil-left').css('left', '42px')    
    $('.pupil-right').css('left', '166px') 
}

function eyesType1() {  // Look down
    $('.cat__eye').find('span').css('border-top', '15px solid')
}

function eyesType2() {  // Look up
    $('.cat__eye').find('span').css('border-bottom', '15px solid')
}

function eyesType3() {  // Narrow pupils (straight ahead)
    $('.cat__eye').find('span').css('width', '22px')  // Wide-42, Narrow-22 
    $('.pupil-left').css('left', '52px')    // Recentre left & right pupils (ie. compensate for
    $('.pupil-right').css('left', '176px')  // 20px width change by moving pupils left +10px)
}

function eyesType4() {  // Narrow pupils looking left
    eyesType3() //Narrow pupils 
    $('.pupil-left').css('left', '42px')    
    $('.pupil-right').css('left', '166px') 
}

function eyesType5() {    // Narrow pupils looking right
    eyesType3() //Narrow pupils 
    $('.pupil-left').css('left', '62px')
   /$('.pupil-right').css('left', '186px')
}

function eyesType6() {  // Cross-eyed
    eyesType3() //Narrow pupils
    $('.pupil-left').css('left', '62px') 
    $('.pupil-right').css('left', '166px')
}

function eyesType7() {  // Lazy left-eye
    eyesType3() //Narrow pupils
    $('.pupil-left').css('left', '42px')
}

function eyesType8() {  // Lazy right eye
    eyesType3() //Narrow pupils
    $('.pupil-right').css('left', '186px')
}

function eyesType9() {  // Two lazy eyes
    eyesType3() //Narrow pupils 
    $('.pupil-left').css('left', '42px') 
    $('.pupil-right').css('left', '186px')
}


function decorationVariation(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            $('#decorationName').html('Short stripes down')
            normaldecoration()
            break
        case 2:
            $('#decorationName').html('Long stripes up')
            normaldecoration()
            patternType1()
            break
        case 3:
            $('#decorationName').html('Angle stripes')
            normaldecoration()
            patternType2()
            break
        case 4:
            $('#decorationName').html("'Bald' patch")
            normaldecoration()
            patternType3()
            break
        case 5:
            $('#decorationName').html('3-prong Leaf')
            normaldecoration()
            patternType4()
            break 
        case 6:
            $('#decorationName').html('Stripe with side blobs')
            normaldecoration()
            patternType5()
            break
        case 7:
            $('#decorationName').html('Two stripes')
            normaldecoration()
            patternType6()
            break  
        case 8:
            $('#decorationName').html('One strip')
            normaldecoration()
            patternType7()
            break 
        case 9:
            $('#decorationName').html('Spikey hair')
            normaldecoration()
            patternType8()
            break 
        case 10:
            $('#decorationName').html('No pattern')
            normaldecoration()
            patternType9()
            break 
        default:
            console.log(`decorationVariation(${num}): Unexpected parameter number`)
        break                               
    }
}

function normaldecoration() {
    //Remove all style from other decorations (to reset)
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%", "left": "101" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%", "left": "-20px"})
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%", "left": "20px" })
}

function patternType1() {  // Long stripes up
    $('.cat__head-dots').css({ "transform": "rotate(180deg)", "height": "95px"})
    $('[class^="cat__head-dots_"]').css('height', '80px')
}

function patternType2() {  //Angle stripes
    $('.cat__head-dots').css({ "transform": "rotate(-25deg)", "top":"-6px"})
    $('.cat__head-dots_first').css('top','-5px')
    $('.cat__head-dots_second').css({ "top":"8px", "border-radius":"0px 40% 50% 50%"})
}

function patternType3() {  //'Bald' patch
    $('.cat__head-dots').css({ "height":"40px", "width":"100px", "left": "60px",
                            "border-radius": "50% 50% 30px 30px" })
    $('[class^="cat__head-dots_"]').css('width', '0px')
}

function patternType4() {  //3-prong leaf
    $('.cat__head-dots_first').css({ "transform":"rotate(36deg)", "border-radius":"50% 0px 50% 50%" })
    $('.cat__head-dots_second').css({ "transform":"rotate(-36deg)", "border-radius":"0px 50% 50% 50%" })
}

function patternType5() {  //Stripe with side blobs
    $('.cat__head-dots').css({ "width":"20px", "left": "98px" })
    $('.cat__head-dots_first').css({ "width":"35px", "left":"-38px", "border-radius":"25px 0px 50% 50%"})
    $('.cat__head-dots_second').css({ "width":"35px", "left":"23px", "border-radius":"0px 25px 50% 50%" })
}

function patternType6() {  //Two stripes
    $('.cat__head-dots').css('width', '0px')
}

function patternType7() {  //One stripe 
    $('[class^="cat__head-dots_"]').css('width', '0px')
}

function patternType8() {  //Spikey hair
    $('.cat__head-dots').css({ "transform": "rotate(180deg)", "top": "-40px" })
}

function patternType9() {  //No pattern
    $('.cat__head-dots').css('width', '0px')
    $('[class^="cat__head-dots_"]').css('width', '0px')
}


function animationVariation(num) {

    removeAllAnimations()
    $('#dnaanimation').html(num)

    switch (num) {
        case 1:
            $('#animationName').html('Roll head')
            animationType1()
        break
        case 2:
            $('#animationName').html('Swish tail')
            animationType2()
        break
        case 3:
            $('#animationName').html('Wiggle left ear')
            animationType3()
        break
        case 4:
            $('#animationName').html('Wiggle right ear')
            animationType4()
        break
        case 5:
            $('#animationName').html('Wiggle both ears')
            animationType5()
        break
        case 6:
            $('#animationName').html('Alert ears')
            animationType6()
        break
        case 7:
            $('#animationName').html('Twitch nose & whiskers')
            animationType7()
        break
        case 8:
            $('#animationName').html('Wandering eyes')
            animationType8()
        break
        case 9:
            $('#animationName').html('Standing up')
            animationType9()
        break
        case 10:
            $('#animationName').html('Hyperactive')
            animationType10()
        break
        default:
            console.log(`animationVariation(${num}): Unexpected parameter number`)
        break                               
    }
}

function removeAllAnimations() { 

    $("#head").attr("class", "cat__head")
    $("#leftEar").attr("class", "cat__ear--left")
    $("#rightEar").attr("class", "cat__ear--right")
    $("#tail").attr("class", "cat__tail")

    $("#nose").attr("class", "cat__nose")
    $("#leftWhiskers").attr("class", "cat__whiskers-left")
    $("#rightWhiskers").attr("class", "cat__whiskers-right")

    $("#eyes").attr("class", "cat__eye")
    $("#cat").attr("class", "cat")

    $("#leftFrontPaw").attr("class", "cat__paw-left_front")
    $("#rightFrontPaw").attr("class", "cat__paw-right_front")
    $("#leftRearPaw").attr("class", "cat__paw-left_rear")
    $("#rightRearPaw").attr("class", "cat__paw-right_rear")
}

function animationType1() {  // Roll Head
    $("#head").addClass("movingHead")
    $("#leftEar").addClass("movingLeftEar")
    $("#rightEar").addClass("movingRightEar")
}

function animationType2() {  // Swish Tail
    $("#tail").addClass("movingTail")
}

function animationType3() {  // Wiggle left ear
    $("#leftEar").addClass("wiggleLeftEar")
}
function animationType4() {  // Wiggle right ear
    $("#rightEar").addClass("wiggleRightEar")
}

function animationType5() {  // Wiggle both ears
    $("#leftEar").addClass("wiggleLeftEar")
    $("#rightEar").addClass("wiggleRightEar")
}

function animationType6() {  // Alert ears
    $("#leftEar").addClass("alertingLeftEar")
    $("#rightEar").addClass("alertingRightEar")
}

function animationType7() {  // Twitch nose & whiskers
    $("#nose").addClass("twitchingNose")
    $("#leftWhiskers").addClass("twitchingLeftWhiskers")
    $("#rightWhiskers").addClass("twitchingRightWhiskers")
}

function animationType8() {  // Wandering eyes
    $("#eyes").addClass("wanderingEyes")
}

function animationType9() {  // Stand up
    $("#cat").addClass("catRising")
    $("#leftRearPaw, #rightRearPaw").addClass("extendingRearLeg")
    $("#leftFrontPaw, #rightFrontPaw").addClass("raisingFrontLeg")
}

function animationType10() {  // Hyperactive
    animationType1()     // Roll head
    animationType2()     // Swish Tail
    animationType5()    // Wiggle both ears
    animationType7()    // Twitch nose & whiskers
    animationType8()   // Wandering eyes
    animationType9()   // Standing up
}

