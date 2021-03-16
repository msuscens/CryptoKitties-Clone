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

const eyeVariations = [
    {
      "name" : "Big Round Eyes",
      "setEyes" : normalEyes
    },
    {
      "name" : "Look Down",
      "setEyes" : eyesType1
    },
    {
        "name" : "Look Up",
        "setEyes" : eyesType2
    },
    {
        "name" : "Narrow pupils",
        "setEyes" : eyesType3
    },
    {
        "name" : "Narrow pupils, looking left",
        "setEyes" : eyesType4
    },
    {
        "name" : "Narrow pupils, looking right",
        "setEyes" : eyesType5
    },
    {
        "name" : "Cross-eyed",
        "setEyes" : eyesType6
    },
    {
        "name" : "Lazy left-eye",
        "setEyes" : eyesType7
    },
    {
        "name" : "Lazy right-eye",
        "setEyes" : eyesType8
    },
    {
        "name" : "Two lazy eyes",
        "setEyes" : eyesType9
    }
  ]

const decorationVariations = [
    {
        "name" : "Short stripes downs",
        "setDecoration" : normaldecoration
    },
    {
        "name" : "Long stripes up",
        "setDecoration" : patternType1
    },
    {
        "name" : "Angle stripes",
        "setDecoration" : patternType2
    },
    {
        "name" : "'Bald' patch",
        "setDecoration" : patternType3
    },
    {
        "name" : "3-prong Leaf",
        "setDecoration" : patternType4
    },      
    {
        "name" : "Stripe with side blobs",
        "setDecoration" : patternType5
    },
    {
        "name" : "Two stripes",
        "setDecoration" : patternType6
    },      
    {
        "name" : "One strip",
        "setDecoration" : patternType7
    },      
    {
        "name" : "Spikey hair",
        "setDecoration" : patternType8
    },
    {
        "name" : "No pattern",
        "setDecoration" : patternType9
    }
]

const animationVariations = [
    {
        "name" : "Roll head",
        "setAnimation" : animationType1
    },
    {
        "name" : "Swish tail",
        "setAnimation" : animationType2
    },
    {
        "name" : "Wiggle left ear",
        "setAnimation" : animationType3
    },
    {
        "name" : "Wiggle right ear",
        "setAnimation" : animationType4
    },
    {
        "name" : "Wiggle both ears",
        "setAnimation" : animationType5
    },      
    {
        "name" : "Alert ears",
        "setAnimation" : animationType6
    },
    {
        "name" : "Twitch nose & whiskers",
        "setAnimation" : animationType7
    },      
    {
        "name" : "Wandering eyes",
        "setAnimation" : animationType8
    },
    {
        "name" : "Standing up",
        "setAnimation" : animationType9
    },
    {
        "name" : "Hyperactive",
        "setAnimation" : animationType10
    }
]


