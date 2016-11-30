chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.type === 'userEvent') {
    sendResponse({result: 'ok'})
  }
})
