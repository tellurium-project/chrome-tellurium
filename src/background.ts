import * as socketIO from 'socket.io-client'
import Frame from './lib/Frame'
import Script from './lib/Script'

var script = new Script
var sessionId = null
var recording = false
const io = socketIO('http://localhost:9000')
// io.on('connect', () => {
//   console.log(`Socket ID: ${io.id}`)
// })
//
// io.on('startCapture', (data) => {
//   console.log(`startCapturing: ${data.sessionId}`)
//   sessionId = data.sessionId
// })

function sendMessage(message, res?: (res: any) => void) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, res)
  })
}
// 
// chrome.browserAction.onClicked.addListener((tab) => {
//   chrome.windows.create({ url: "../pages/popup.html" })
// })

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  switch (req.type) {
    case 'documentEvent':
      console.log(req.payload, sessionId)
      // io.emit('createOperation', { sessionId: sessionId, operation: req.payload })
      break
    case 'startOrStopRecording':
      if (recording) {
        recording = false
        chrome.browserAction.setIcon({path: '../images/default_icon.png'})
        sendResponse('recordingStopped')
        sendMessage({type: 'recordingStopped'})
      } else {
        recording = true
        chrome.browserAction.setIcon({path: '../images/recording_icon.png'})
        sendResponse('recordingStarted')
        sendMessage({type: 'recordingStarted'})
      }

      break
    case 'isRecording':
      sendResponse(recording)
      break
    case 'stepInserted':
      console.log(req)
      script.insertStep(req.payload.step)
      // console.log('stepInserted', req.payload)
      break
    case 'stepReplaced':
      // console.log('stepReplaced', req.payload)
      script.replaceStep(req.payload.step, req.payload.index)
      break
  }
})

script.on('stepInserted', (e) => {
  console.log(e)
  sendMessage({type: 'insertStep', payload: e.payload})
})

script.on('stepReplaced', (e) => {
  sendMessage({type: 'replaceStep', payload: e.payload})
})
