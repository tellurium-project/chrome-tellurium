import Detector from './lib/Detector'
import './locators'
import * as Rx from 'rxjs/Rx'

const detector = new Detector(window)
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
