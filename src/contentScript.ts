import Frame from './lib/Frame'
import Detector from './lib/Detector'
import * as Rx from 'rxjs/Rx'

const frame = new Frame(window)
const detector = new Detector(frame)
detector.bind()
detector.enable()
//
// chrome.runtime.onMessage.addListener((res, sender, sendResponse) => {
//   switch (res.type) {
//     case 'pageLoaded':
//       detector.bind()
//       detector.enable()
//       break
//   }
// })

detector.on('detect', function (event) {
  console.log(event)
  chrome.runtime.sendMessage({type: 'detect', event: event})
})
