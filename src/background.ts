import * as socketIO from 'socket.io-client'
import * as event from 'eventemitter2'
import Frame from './lib/Frame'
import * as Rx from 'rxjs/Rx'

var sessionId = null
var recording = false
const io = socketIO('http://localhost:9000')

function sendMessage(message, res?: (res: any) => void) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, res)
  })
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  switch (req.type) {
    case 'detect':
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        console.log(tabs, tabs[0].url)
        io.emit('detectEvent', { event: req.event, url: tabs[0].url })
      })

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
