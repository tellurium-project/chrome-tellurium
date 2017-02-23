import * as socketIO from 'socket.io-client'
import * as Rx from 'rxjs/Rx'
import EventBuffer from './lib/EventBuffer'
import VirtualEvent from './lib/VirtualEvent'

var sessionId = null
var recording = false
const eventBuffer = new EventBuffer
const io = socketIO('http://localhost:10000')

function sendMessage(message, res?: (res: any) => void) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, res)
  })
}

eventBuffer.on('event', (event) => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    console.log(event)
    io.emit('detectEvent', { event: event, url: tabs[0].url })
  })
})

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  switch (req.type) {
    case 'detect':
      eventBuffer.push(new VirtualEvent(req.event))
      break
  }
})

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
    if (info.status === 'complete') {
      sendMessage({type: 'pageLoaded'})
    }
  })
})
