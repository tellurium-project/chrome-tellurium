
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  switch (req.type) {
    case 'documentEvent':
      console.log(req.payload)
      const request = new XMLHttpRequest()
      request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 200) {
          console.log('success')
        }
      })
      request.open('POST', 'http://localhost:9000/sessions/x/events')
      request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      request.send(JSON.stringify(req.payload))
      break
  }

  sendResponse({result: 'ok'})
})
