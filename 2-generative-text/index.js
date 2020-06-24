const sentenceLengthEl = d3.select('#sentenceLength')
let sentenceLength = sentenceLengthEl.property("value")
const levelSettingEl = d3.select('#levelSetting')
let levelSetting = Number(levelSettingEl.property("value"))

let data
let words
let columns
const iterations = 20

sentenceLengthEl.on('change', lengthChanged)
levelSettingEl.on('change', levelChanged)

main()

async function main(){
  data = await d3.csv('taxonomie_2.csv')
  
  words = cleanData(data)
  console.log("word Data", data)

  columns = []
  words.forEach(word => {
    columns = columns.concat(word.dimensions)
  })
  columns = [...new Set(columns)]
  console.log("columns", columns)

  setupInputs(columns, sentenceLength)
  selectionChanged()
}

function cleanData(data){
  // console.log("parsing data", data)
  return data.map(item => {
    return {
      word: item.woord,
      //Check if a dimension equals 1 (main meaning of the word is indicated with 1)
      dimensions: Object.keys(item).filter(dimension => {
        return item[dimension] <= levelSetting && dimension !== "woord" && item[dimension] != ''
      })
    }
  })
}

function generateText(words, pattern, length){
  //console.log("generating", pattern)
  let text = ''

  // random selective
  for (let i of pattern){
    let candidates = words.filter(word => word.dimensions.includes(i))
    text += candidates[Math.floor(Math.random() * candidates.length)].word + " "
  }
  
  // // first selective
  // for (let i of pattern){
  //   text += words.find(word => word.dimensions.includes(i)).word + " "
  // }

  //non random non selective
  // for (let i = 0; i < length; i ++){
  //   text += words[i].word + " "
  // }
  return text
}

//This function makes dynamic input options based on our data!
function setupInputs(dimensions, amount){
  d3.select('form').selectAll('select').remove()
  
  for (let i = 0; i < amount; i ++){
    const randomSelect = dimensions[Math.floor(Math.random() * dimensions.length)]
    d3.select('form')
      .append('select')
      .text("Select a text value")
      .on('change', selectionChanged)
      .selectAll('option')
      .data(dimensions)
      .enter()
      .append('option')
        .attr('value', d => d)
        .text(d => d) 
        .property("selected", d => d === randomSelect)
  }
}

function selectionChanged(){
  let dimensions = []
  d3.select('form')
    .selectAll("option:checked")
    .each(function() { dimensions.push(this.value) })
  d3.select('#output').selectAll('p').remove()
  for (let i = 0; i < iterations; i ++){
    const sentence = generateText(words, dimensions, dimensions.length)
    // console.log(sentence)
    d3.select('#output').append('p').text(sentence)
  }
}

function lengthChanged(){
  sentenceLength = sentenceLengthEl.property("value")
  setupInputs(columns, sentenceLength)
  selectionChanged()
}

function levelChanged(){
  levelSetting = levelSettingEl.property("value")
  words = cleanData(data)
  setupInputs(columns, sentenceLength)
  selectionChanged()
}