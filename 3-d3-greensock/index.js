// Todo: Write a nice reusable transform function, or implement this lib: https://github.com/trinary/d3-transform
// TODO: finish rotating along circle using this example https://spin.atomicobject.com/2015/06/12/objects-around-svg-circle-d3-js/
const container = d3.select("#container")
const duration = 5
const rectWidth = 140
const rectHeight = 160
const containerWidth = parseInt(container.style("width"), 10)
const containerHeight = parseInt(container.style("height"), 10)

const cardContents = [
  {
    word: `Body`,
    text: `I am being exploited. What does it mean to have a body? Who owns my hands, my feet? What does it mean; a body on the street? What is a protest? How many bodies can fill a square? What language does your body speak?`,
    transform: { 
      translate: [50, 60],
      origin: [30, 70],
      rotate: -20,
    }
  },
  {
    word: `Audience`,
    text: `I am watching. What does it mean to watch? Am I just an eyeball? A Passive passenger watching history as it unfolds? Am I responsible for what I see? Can I become part of an activated audience? Actor and observer at the same time? What does an invitation look like?`,
    transform: { 
      translate: [300, 20],
      rotate: 0
    }
  },
  {
    word: `Precarity`,
    text: `I am living in precariousness. What does it mean to live in precarious conditions? To not have a seat at the table? To lack the words, symbols, images for a real conversation? What does it mean to have no voice? What does it mean to not be heard?`,
    transform: { 
      translate: [550, 50],
      origin: [30, 70],
      rotate: 20
    }
  },
]
const originX = containerWidth/ 2;
const originY = containerHeight/ 2;
const circleRadius = 65;
const chairOriginX = originX + (circleRadius * Math.sin(0))
const chairOriginY = originY - (circleRadius * Math.cos(0))
const chairWidth = 20
console.log(chairOriginX)

const circle = container
  .append("circle")
  .attr('width', 50)
  .attr('height', 50)
  .attr('cx', originX)
  .attr('cy', originY)
  .attr('r', circleRadius)
  .attr('fill', 'none')
  .attr('stroke', "white")

drawCards(cardContents, container)
animate()

//This animates the text along the given path
function animate(){
  gsap.from("#masterTextPath", duration, {
    attr: { startOffset: "100%" },
    ease: Power1.easeOut
  })
}


function drawCards(contents, container){
  contents.forEach( (card, i) => {
    console.log(card)
    drawRect(card, container, i)
  })
}
                   

const chair = container
  .append("rect")
  .attr('x', chairOriginX - (chairWidth / 2))
  .attr('y', chairOriginY - chairWidth)
  .attr('width', chairWidth)
  .attr('height', chairWidth)
  .attr('stroke', "white")
  .attr('fill', 'none')
chair
  .attr('transform', 'rotate(120,'+ originX +','+ originY +')')

//This function adds a path to our svg that we'll later use to animate text along
function drawRect(card, parent, id){
  const rectPath = d3.path()
  rectPath.rect(0,0, rectWidth, rectHeight)
  
  //Draw the path
  //TODO: Can't seem to get the rotation to work the way I want. The current setup overwrites
  // the original translation so the positioning is of but it does rotate around the right point.
  // The other version doesnt rotate right but the positioning works
  // It looks like the rotation is perfomred before the translation
  const path = parent.append('path')
  path
    .attr('d',rectPath)
    .attr('id', 'master' + id)
    .attr("transform", 
          'translate('
          +(chairOriginX - (rectWidth / 2))+','
          +(chairOriginY - rectHeight)+')')
    .attr('fill','none')
    .attr('stroke','#fff')
  path
    .attr("transform", 'rotate('+10 * id+','+ originX +','+ originY +')')
  
  // parent
  //   .append('path')
  //  .attr('d',rectPath)
  //   .attr('id', 'master' + id)
  //  .attr("transform", 
  //         'translate('
  //         +(chairOriginX - (rectWidth / 2))+','
  //         +(chairOriginY - rectHeight)+')'
  //         +'rotate('+10 * id+','+ originX +','+ originY +')')
  //   // .attr("transform", "rotate("+45+","+originX+","+originY+")")
  //   .attr('fill','none')
  //   .attr('stroke','#fff')
  //Append the text using an href link
  parent
    .append('text')
    .attr('id', 'mainText')
    .attr('fill','#fff')
    .append('textPath')
      .attr('id', 'masterTextPath')
      .attr('href', '#master' + id)
      // .attr('startOffset', '0%')
      .text(card.text)
}