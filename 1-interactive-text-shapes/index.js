//SVG Elements
const input = document.querySelector('input[type=text]')
const draw = SVG().addTo('#drawing').viewbox(0, 0, 300, 300)
const container = draw.nested()

//Settings
const textSize = 3.5
const rectangleAmount = 10
const cardContents = [
  {
    word: `Body`,
    text: `I am being exploited. What does it mean to have a body? Who owns my hands, my feet? What does it mean; a body on the street? What is a protest? How many bodies can fill a square? What language does your body speak?`,
    transform: { 
      translate: {x:10, y: 20},
      origin: [30, 70],
      rotate: -20,
    }
  },
  {
    word: `Audience`,
    text: `I am watching. What does it mean to watch? Am I just an eyeball? A Passive passenger watching history as it unfolds? Am I responsible for what I see? Can I become part of an activated audience? Actor and observer at the same time? What does an invitation look like?`,
    position: {x: 80, y: 0},
    transform: { 
      translate: {x:80, y: 0},
      rotate: 0
    }
  },
  {
    word: `Precarity`,
    text: `I am living in precariousness. What does it mean to live in precarious conditions?To not have a seat at the table? To lack the words, symbols, images for a real conversation? What does it mean to have no voice? What does it mean to not be heard?`,
    position: {x: 150, y: 40},
    transform: { 
      translate: {x:150, y: 20},
      origin: [30, 70],
      rotate: 20
    }
  },
]

const cardsContainer = drawCards(cardContents, container)
container.animate(1000).transform({rotate: 125 })
// container.transform({rotate: 125 })
function drawCards(contents, container){
  contents.forEach( (card, i) => {

    function nest(){
      //Create a nested element for positioning
      const nested = container.nested().draggable()
      nested.attr(card.position)
      //Add a group to the nested element that holds all card elements for animation
      const group = nested.group()
      group.transform(card.transform)
    }
    
    const group = container.group()
    console.log(group.transform(card.transform))

    //Adding elements
    const rect = group.rect(40, 60)

    //Stuff for setting up a textpath
    // const customText = `Don't like it? Join. Start thinking about the ritual as a game A game in which the rules are not clear take a step, jump. Build a tent. With rope and bed sheets and everything you can find Sc`
    const customText = card.text
    const text = group.text(function(add) {
      add.tspan(customText)
    })

    const word = group.text(function(add) {
      add.tspan(card.word)
    })
    const customPath ='M 0 10 L 40 10 L 40 60 L 0 60 L 0 0'
    const photographyPos = 'M 0 40 L 40 40'

    const customTextPath = text.path(customPath).font({ size: textSize, family: 'Verdana' })
    const photographyTextPath = word.path(photographyPos).font({ size: textSize, family: 'Verdana' })
    
    //Code animate text position on path. Giving the effect of text being typed out
    text.textPath().attr('startOffset', '-250%')
    text.textPath().animate(6000).attr('startOffset', '0%')  
    
    //Animate moving the center of the nested group
    // nested.animate().center(40, 40)
    
    //Animate rotating the group
    // group.animate(1000).rotate(360)
    
    // text.textPath().animate().attr({ fill: '#FFFFFF' })
  })  
  return container
}

// drawRects(rectangleAmount)
function drawRects(amount){
  const rectangles = []
  for (let i = 0; i< amount; i++){
    rectangles.push(draw.rect(10, 10).draggable().x(i * 10))
  }
  rectangles.forEach(rect => rect.animate().rotate(360))
}

//input.addEventListener('keyup', updateText(customTextPath))
function updateText(textPath) {
  return function() {
    textPath.tspan(this.value)
  }       
}