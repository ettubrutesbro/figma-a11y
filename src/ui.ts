import './ui.css'

console.log('init ui')

let warnings = []

onmessage = (event) => {
  console.log("got this from the main code", event.data.pluginMessage);

  const msg = event.data.pluginMessage 
  if(!msg) return

  if(msg.type === 'warning'){
    warnings.push(msg.message)
    document.getElementById('warnlist').innerHTML = `
      ${warnings.map(warn => `<li>${warn}</li>`)}
    ` 
  }
  if(msg.type === 'result'){
    document.getElementById('result').classList.add('visible')
    document.getElementById('recommendation').classList.add('visible')
    document.getElementById('instructions').classList.remove('visible')

    document.getElementById('result').textContent = `${msg.nodes} `
    + `have a contrast ratio of ${msg.contrast.toFixed(2)}.`

    document.getElementById('recommendation').textContent = `${msg.recommendation}`
  }
  if(msg.type === 'return'){
    document.getElementById('result').classList.remove('visible')
    document.getElementById('recommendation').classList.remove('visible')
    document.getElementById('instructions').classList.add('visible')
  }
}

// document.getElementById('create').onclick = () => {
//   const textbox = document.getElementById('count') as HTMLInputElement
//   const count = parseInt(textbox.value, 10)
//   parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*')
// }

// document.getElementById('cancel').onclick = () => {
//   console.log('nm')
//   parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
// }

