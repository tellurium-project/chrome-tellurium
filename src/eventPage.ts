chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  console.log(req)
  sendResponse({result: 'ok'})
})
