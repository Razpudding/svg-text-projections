//Write code below
var input = document.querySelector('input[type=text]')

var draw = SVG().addTo('#drawing').viewbox(-50, 0, 300, 300)

var nested = draw.nested().y(-60)
let customText = `Don't like it? Join. Start thinking about the ritual as a game A game in which the rules are not clear take a step, jump. Build a tent. With rope and bed sheets and everything you can find Scream: THIS IS AN INVITATION Start sleeping under art in public spaces. Stare at the moon all night long Sit on a chair and face the highway whilst the city wakes up Give rooms arms, legs and eyes Give 10 children, 10 crayons. One crayon each. Exhibit their findings Politicise the jigsaw puzzle, enter the livingroom. create integrated environments consisting of ritual objects, spatial adaptations`
customText = ``
var text = nested.text(function(add) {
  add.tspan(customText)
})
var triangle ='M5,100 L70,5 L135,100 z'
var path = 'M 150 140 C 200 100 300 0 400 100 C 500 200 600 300 700 200 C 800 100 900 100 900 100'
var customPath ='M 30 190 L 150 190 L 160 180 L 160 180 L 100 80 L 80 80 M 80 80 L 80 80 L 20 180 L 30 190 L 53 155 L 64 170 M 82 170 L 53 170 M 58 163 L 46 180 L 90 180 L 60 140 L 80 110 L 100 130 L 80 130 L 114 130 L 80 80 M 80 130 M 80 130 L 80 130 M 88 118 L 73 140 L 120 140 L 140 170 L 113 170 M 105 181 L 113 170 L 113 170 L 120 160 L 110 150 L 90 180'

const customTextPath = text.path(customPath).font({ size: 5.5, family: 'Verdana' })
input.addEventListener('keyup', updateText(customTextPath))

//Animation test code
const animation1 = false
if (animation1){
  var text = draw.text(function(add) {
		add.tspan( input.value ).dy(-60)
  })
  
  textPath = text.path('M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80')

  textPath.animate(1000).ease('<>')
    .plot('M10 80 C 40 150, 65 150, 95 80 S 150 10, 180 80')
    .loop(true, true)
}
function updateText(textPath) {
	return function() {
		textPath.tspan(this.value)
	}				
}