
main()

async function main(){
  let data = await d3.csv('./taxonomie_0.csv')
  
  data = cleanData(data)
  console.log(data)

  let columns = []
  data.forEach(word => {
    columns = columns.concat(word.dimensions)
  })
  columns = [...new Set(columns)]
  console.log(columns)

  const pattern = ['time', 'spatial', 'ideological', 'action', 'relational', 'bodily']
  const text = generateText(columns, data, pattern, 8)
  console.log(text)
}


function cleanData(data){
  // console.log("parsing data", data)
  return data.map(item => {
    return {
      word: item.Woord,
      //Check if a dimension doesn not have an empty string value or equals "Woord"
      dimensions: Object.keys(item).filter(dimension => {
        return item[dimension] !== "" && dimension !== "Woord"
      })
    }
  })
}

function generateText(columns, words, pattern, length){
  console.log(pattern)
  let text = ''
  //Random selective
  for (let i of pattern){
    text += words.find(word => word.dimensions.includes(i)).word + " "
  }
  //non random non selective
  // for (let i = 0; i < length; i ++){
  //   text += words[i].word + " "
  // }
  return text
}