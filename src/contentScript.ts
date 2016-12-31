import Frame from './lib/Frame'
import Detector from './lib/Detector'

const frame = new Frame(window)
const detector = new Detector(frame)
detector.bind()

detector.on('documentEvent', (e) => {
  console.log(e)
  chrome.runtime.sendMessage({type: 'documentEvent', payload: e})
})
