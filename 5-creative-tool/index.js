import {settings as S} from './settings.js'
import {loadData, generateText} from './textGenerator.js'

const container = d3.select("#container")
const cardsContainer = container.append('g')
cardsContainer.attr('id', "cardsContainer")
const containerWidth = parseInt(container.style("width"), 10)
const containerHeight = parseInt(container.style("height"), 10)

//Positioning logic
const originX = containerWidth/ 2
const originY = containerHeight/ 2
const chairOriginX = originX + (S.circleRadius * Math.sin(0))
const chairOriginY = originY - (S.circleRadius * Math.cos(0))

main()
async function main(){
  const wordData = await loadData('taxonomy_0.csv')
  drawCards(wordData, cardsContainer)
  drawText(container)
  animate()
  reformulate(wordData)
}

//Takes wordData and starts a loop that rewrites the center text
function reformulate(words){
  const pattern = S.pattern || ["questions","sexuality","issues"]
  
  repeat()
  //A recursive function that uses d3 to rewrite the center text
  //It was soooo much easier with d3 than with GSAP
  function repeat(){
    d3.select('.center-text')
      .style('opacity', 0)
      .transition()
        .duration(3000 * S.duration)
        .style('opacity', 1)
        .text(generateText(words, pattern))
        .on('end', repeat)
  }
}

//This animates the text along the given path
function animate(){
  const tl = gsap.timeline()  
  //This will stagger all cards and titles separately
  const textPathAnim = gsap.from('.masterTextPath', S.duration,{
    attr: { startOffset: "110%"},
    ease: Power1.easeInOut,
    stagger: 1
  })
  const cardTitleAnim = gsap.to('.cardTitle', S.duration, {
    opacity: 1,
    stagger: S.duration
  })
  //By adding multiple tweens in an array, they are started concurrently
  tl.add([textPathAnim, cardTitleAnim])
    .add(gsap.to('#invitation', S.duration, {
      opacity: 1,
    }))
    .to("#cardsContainer", 10, {
      transformOrigin: '50% 50%',
      rotation: 360,
      ease:Linear.easeNone
    })
  console.log(tl)
}

// Function to generate cards
function drawCards(contents, container){
  console.log("Drawing cards") 
  let cardsDrawn = 0
  
  //If a theme is set, generate a list of words from that theme to be used
  //This needs to be a copy so we don't manipulate the source data later
  let themedWords = S.theme !== ""? [...contents[S.theme]] : []
  
  for (let i in contents){
    let cardName = ""
    if (cardsDrawn >= S.numberOfCards){
      break
    }
    //If there is a theme set, pass a word from the corresponding category
    if (S.theme !== ""){
      //Get a random element in the array, store it in cardname and delete from the array
      cardName = themedWords.splice(Math.floor((Math.random() * themedWords.length)), 1)[0]
    }
    //else, pass a word from the card's own category
    else {
      cardName = i
    }
    drawCard(cardName, contents[i], container, cardsDrawn) 
    cardsDrawn ++
  }
}

//This function adds a path to our svg that we'll later use to animate text along
// It takes card data, a parent element and a unique id
function drawCard(cardName, cardText, target, id){
  parent = target.append('g')
  parent.attr('class', 'card')
  
  const rectPath = d3.path()
  rectPath.rect(0,0, S.cardWidth, S.cardHeight)
  
  //Append the path
  const path = parent.append('path')
  path
    .attr('d',rectPath)
    .attr('id', 'master' + id)
    .attr('fill','none')
    .attr('stroke','none')
  
  //Rotate the card in relation to the circles center point
  parent
    .attr("transform", 
          `rotate( ${(360 /S.numberOfCards) * id} , ${originX} , ${originY} ) `+
          `translate( ${(chairOriginX - (S.cardWidth / 2))} , ${(chairOriginY - S.cardHeight)} )`)

  //Append the text using an href link
  parent
    .append('text')
    .attr('id', 'mainText')
    .attr('fill','#fff')
    .append('textPath')
      .attr('class', 'masterTextPath')
      .attr('href', '#master' + id)
      .attr('startOffset', '0%')
      .text(cardText.join(' '))
  
  //Add a text for the word in the middle of the card
  parent
    .append('text')
    .attr('fill','#fff')
    .attr('class', 'cardTitle')
    .attr('x', S.cardWidth / 2)
    .attr('y', S.cardHeight / 2)
    .text(cardName) 
}

//Add the text in the center of the viz
function drawText(target){
  target.append('text')
    .attr('class','center-text')
    .text(S.centerText)
    .attr('id', 'invitation')
    .attr('x', containerWidth /2)
    .attr('y', containerHeight/2)
    .attr('fill', 'goldenrod')
    .attr('font-size', '24')
}