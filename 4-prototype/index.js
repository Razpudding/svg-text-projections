// TODO: Get rid of remaining magic numbers
import {settings as S} from './settings.js'
import {cardContents} from './settings.js'

const container = d3.select("#container")
const cardsContainer = container.append('g')
cardsContainer.attr('id', "cardsContainer")
const containerWidth = parseInt(container.style("width"), 10)
const containerHeight = parseInt(container.style("height"), 10)

//Positioning logic
const originX = containerWidth/ 2;
const originY = containerHeight/ 2;
const chairOriginX = originX + (S.circleRadius * Math.sin(0))
const chairOriginY = originY - (S.circleRadius * Math.cos(0))

const circle = drawCircle()
drawCards(cardContents, cardsContainer)
drawText(container)
animate()

//This animates the text along the given path
function animate(){
  const tl = gsap.timeline();
  const elements = document.querySelectorAll(".card") 
  
  //This will stagger all cards and then show all texts
  // tl.add('card')
  // tl.add(gsap.from(".masterTextPath", {
  //   attr: { startOffset: "100%"},
  //   ease: Power1.easeInOut,
  //   stagger: 1
  // }, 'card')
  // ).to('.cardTitle', S.duration, {
  //   opacity: 1,
  // })
  
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
  
  //This loops over an array and animates each element individually
  // elements.forEach( (el, i) => {
  //   // console.log(el)
  //   let test = 
  //   gsap.from(el, S.duration, {
  //     attr: { startOffset: "100%"},
  //     ease: Power1.easeInOut,
  //   })
  //   gsap.to('.cardTitle', S.duration, {
  //    opacity: 1,
  //   })
  //   tl.add(test)
  // })
  tl.add(gsap.to('#invitation', S.duration, {
    opacity: 1,
  })
  ).to("#cardsContainer", 10, {
    // transformOrigin: `${originX}px ${originY}px`,
    transformOrigin: '50% 50%',
    rotation: 360,
    ease:Linear.easeNone
  })
  console.log(tl)
}

function drawCards(contents, container){
  contents.forEach( (card, i) => {
    drawRect(card, container, i)
  })
}

//This function adds a path to our svg that we'll later use to animate text along
// It takes card data, a parent element and a unique id
function drawRect(card, target, id){
  parent = target.append('g')
  parent.attr('class', 'card')
  console.log(parent)
  
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
          `rotate( ${(360 /cardContents.length) * id} , ${originX} , ${originY} ) `+
          `translate( ${(chairOriginX - (S.cardWidth / 2))} , ${(chairOriginY - S.cardHeight)} )`)

  //Append the text using an href link
  parent
    .append('text')
    .attr('id', 'mainText')
    .attr('fill','#fff')
    .append('textPath')
      .attr('class', 'masterTextPath')
      .attr('href', '#master' + id)
      .attr('startOffset', '-100%')
      .text(card.text)
  
  parent
    .append('text')
    .attr('fill','#fff')
    .attr('class', 'cardTitle')
    .attr('x', S.cardWidth / 2)
    .attr('y', S.cardHeight / 2)
    .text(card.word) 
}

function drawCircle(){
  return container
  .append("circle")
    .attr('cx', originX)
    .attr('cy', originY)
    .attr('r', S.circleRadius)
    .attr('fill', 'none')
    .attr('stroke', "none")
}

function drawText(target){
  target.append('text')
    .text(S.centerText)
    .attr('id', 'invitation')
    .attr('x', containerWidth /2)
    .attr('y', containerHeight/2)
    .attr('fill', 'goldenrod')
    .attr('font-size', '24')
}