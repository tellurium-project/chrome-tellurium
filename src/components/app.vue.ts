import * as Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'App',
  template: `
    <div>
      <a @click="startOrStopRecording" href="#">{{ recording ? '記録停止' : '記録開始' }}</a>

      <table id="script" class="script">
        <tr>
          <th>Step type</th>
          <th>Arguments</th>
        </tr>
        <tr class="step">
          <td>click</td>
          <td>locator: 'aaaa'</td>
        </tr>
        <tr class="step">
          <td>inputText</td>
          <td>locator: 'aaaa', text: 'aaa'</td>
        </tr>
      </table>
    </div>
  `
})
class App extends Vue {
  recording: boolean = false
  steps = []

  created () {
    chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
      switch (req.type) {
        case 'insertStep':
          this.steps.splice(req.payload.index, 0, req.payload.step)
          console.log(req)
          break
        case 'replaceStep':
          this.steps.splice(req.payload.index, 1, req.payload.step)
          console.log(req)
          break
      }
    })
  }

  checkRecordingState (cb?) {
    this.isRecording((recording) => {
      this.recording = recording
      cb
    })
  }

  startOrStopRecording () {
    chrome.runtime.sendMessage({type: 'startOrStopRecording'})
    this.checkRecordingState()
  }

  isRecording (cb) {
    chrome.runtime.sendMessage({ type: 'isRecording' }, cb)
  }
}

export default App
