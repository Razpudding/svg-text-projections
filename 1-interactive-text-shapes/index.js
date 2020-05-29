//SVG Elements
const input = document.querySelector('input[type=text]')
const draw = SVG().addTo('#drawing').viewbox(0, 0, 300, 300)
const nested = draw.nested().dx(100).draggable()
const group = nested.group()

//Settings
const textSize = 3.5
const rectangleAmount = 10

//Adding elements
group.rect(40, 60)

//Stuff for setting up a textpath
const customText = `2Don't like it? Join. Start thinking about the ritual as a game A game in which the rules are not clear take a step, jump. Build a tent. With rope and bed sheets and everything you can find Sc`
const text = group.text(function(add) {
  add.tspan(customText)
})

const word = group.text(function(add) {
  add.tspan("Photography")
})
const customPath ='M 0 10 L 40 10 L 40 60 L 0 60 L 0 0'
const photographyPos = 'M 0 40 L 40 40'

const customTextPath = text.path(customPath).font({ size: textSize, family: 'Verdana' })
const photographyTextPath = word.path(photographyPos).font({ size: textSize, family: 'Verdana' })

//Code to start later on in the path
// text.textPath().attr('startOffset', '0%')
// text.textPath().animate(3000).attr('startOffset', '80%')


// drawRects(rectangleAmount)
function drawRects(amount){
  const rectangles = []
  for (let i = 0; i< amount; i++){
    rectangles.push(draw.rect(10, 10).draggable().x(i * 10))
  }
  rectangles.forEach(rect => rect.animate().rotate(360))
}


input.addEventListener('keyup', updateText(customTextPath))

function updateText(textPath) {
  return function() {
    textPath.tspan(this.value)
  }       
}