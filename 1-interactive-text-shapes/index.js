//SVG Elements
const input = document.querySelector('input[type=text]')
const draw = SVG().addTo('#drawing').viewbox(0, 0, 300, 300)
const container = draw.nested()

//Settings
const textSize = 3.5
const rectangleAmount = 10
const cardContents = [
  {
    word: `Photography`,
    text: `I would like to discuss here some elements that I think contribute to the value of many works of visual art, particularly photographs. This is not meant to imply or show that these are the only elements of value nor that they will apply to all art, to all visual art, or even to all photographs, because I think some artists have or could have other ideals and other quests, and because creative artistic ideas could always be thought of that would not fit my perhaps narrow ideas.`,
    position: {x: 10, y: 40}
  },
  {
    word: `Philosophy`,
    text: `The regions of the fertile Crescent, Iran and Arabia are home to the earliest known philosophical Wisdom literature and is today mostly dominated by Islamic culture. Early wisdom literature from the fertile crescent was a genre which sought to instruct people on ethical action, practical living and virtue through stories and proverbs. In Ancient Egypt, these texts were known as sebayt ('teachings') and they are central to our understandings of Ancient Egyptian philosophy.`,
    position: {x: 80, y: 0}
  },
  {
    word: `Illustration`,
    text: `From the early 1800s newspapers, mass-market magazines, and illustrated books had become the dominant consumer media in Europe and the New World. By the 19th century, improvements in printing technology freed illustrators to experiment with color and rendering techniques. hese developments in printing effected all areas of literature from cookbooks, photography and travel guides, as well as children's books. Also, due to advances in printing it became more affordable to produce color photographs within books and other materials`,
    position: {x: 150, y: 40}
  },
]

const cardsContainer = drawCards(cardContents, container)
// TODO: Can't seem to rotate nested yet
container.animate(1000).transform({rotate: 125 })
// container.transform({rotate: 125 })
function drawCards(contents, container){
  contents.forEach( (card, i) => {
    //Create a nested element for positioning
    const nested = container.nested().draggable().attr(card.position)
    //Add a group to the nested element that holds all card elements for animation
    const group = nested.group()

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
    text.textPath().attr('startOffset', '-550%')
    text.textPath().animate(3000).attr('startOffset', '-350%')  
    
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