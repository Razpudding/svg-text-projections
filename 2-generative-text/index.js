const sentenceLengthEl = d3.select('#sentenceLength')
let sentenceLength = sentenceLengthEl.property("value")

let words = {}
let columns
const iterations = 20

sentenceLengthEl.on('change', lengthChanged)

main()

async function main(){
  await d3.csv('taxonomie_0.csv', parseRow)
  console.log("word Data", words)
  //words = cleanData(data)
  
  columns = Object.keys(words)
  console.log("columns", columns)

  setupInputs(columns, sentenceLength)
  selectionChanged()
}

function parseRow(row){
  // console.log(row)
  for (let column in row){
    if (row[column] == ""){
      continue
    }
    if (!words[column]) {
      words[column] = []
    }
    words[column].push(row[column])
  }
}

function generateText(words, pattern, length){
  console.log("generating", pattern)
  let text = ''
  let sentenceEnd = pattern.includes("questions") ? "?" : "."

  // random selective
  for (let i of pattern){
    let candidates = words[i]
    // console.log(candidates)
    text += candidates[Math.floor(Math.random() * candidates.length)] + " "
  }
  text = text.replace(/.$/, sentenceEnd)
  
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