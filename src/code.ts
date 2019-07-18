import * as chroma from 'chroma-js'
import * as ordinal from 'ordinal'

figma.showUI(__html__)

console.log(ordinal)

const checkSelection = () => {
  console.log('check')
  const selection = figma.currentPage.selection
  if(selection.length >= 2){
    //check first two for fills
    let colors = []

    for(var i = 0; i<2; i++){
      console.log(selection[i])
      const filldata = selection[i].fills[0]
      if(selection[i].fills.length > 1) figma.ui.postMessage({
        type: 'warning',
        message: `The ${ordinal(i+1)} color has more than one fill - that's not supported.`
      })
      const { r, g, b } = filldata.color
      const color = chroma.rgb([r, g, b].map(v => v * 255))
      colors.push(color.hex())
    }
    console.log(`comparing colors ${colors[0]} and ${colors[1]}`)

    const nodes = `${selection[0].name} (${selection[0].type}) and ${selection[1].name} (${selection[1].type})`
    const contrast = chroma.contrast(colors[0], colors[1])
    console.log(contrast)
    //TODO: add contingencies based on text size and weight:
      //https://medium.com/san-francisco-digital-service/color-accessibility-beyond-a-pass-fail-2ea19be4b3c1
    const recommendation = contrast >= 6.99? "That passes WCAG's AAA standard."
      : contrast >= 4.49? "That passes WCAG's AA standard." : "That doesn't pass WCAG."

    figma.ui.postMessage({
      type: 'result',
      nodes: nodes,
      contrast: chroma.contrast(colors[0], colors[1]),
      recommendation: recommendation
    
    })

  }
  else{
    figma.ui.postMessage({
      type: 'return'
    })
  }
}

figma.ui.onmessage = msg => {
    //do something in response to a message from the UI (i.e. an event
    //when a button is pressed)
  }
  // figma.closePlugin()
}


setInterval(checkSelection, 100) //not great...