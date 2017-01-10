import * as socketIO from 'socket.io-client'

const io = socketIO('http://localhost:9000')
io.on('connect', () => {
  console.log(`Socket ID: ${io.id}`)
})

io.on('startCapture', (data) => {
  console.log(`startCapturing: ${data}`)
})

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  switch (req.type) {
    case 'documentEvent':
      console.log(req.payload)
      io.emit('createOperation', req.payload)
      break
  }

  sendResponse({result: 'ok'})
})
