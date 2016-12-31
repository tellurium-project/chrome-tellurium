import Frame from './lib/Frame'
import Recorder from './lib/Recorder'

const frame = new Frame(window)
const recorder = new Recorder(frame)
recorder.setUp()

console.log('hoge')
