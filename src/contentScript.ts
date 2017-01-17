import Frame from './lib/Frame'
import Script from './lib/Script'
import Recorder from './lib/Recorder'

const frame = new Frame(window)
const script = new Script()
const recorder = new Recorder(frame, script)

chrome.runtime.onMessage.addListener((res, sender, sendResponse) => {
  switch (res.type) {
    case 'recordingStarted':
      console.log('started')
      recorder.start()
      break
    case 'recordingStopped':
      recorder.stop()
      break
    case 'finish':
      break
  }
})
//
// recorder.on('stepInserted', (step) => {
//   chrome.runtime.sendMessage({type: 'stepInserted', payload: step})
// })

script.on('stepInserted', function (e) {
  chrome.runtime.sendMessage({type: 'stepInserted', payload: e})
})

script.on('stepReplaced', function (e) {
  chrome.runtime.sendMessage({type: 'stepReplaced', payload: e})
})

window.addEventListener('load', () => {
  console.log('hoge')
  recorder.bind()
})
