import * as event from 'eventemitter2'
import * as Rx from 'rxjs/Rx'
import VirtualEvent from './VirtualEvent'
// import VirtualElement from './VirtualElement'

export default class EventBuffer extends event.EventEmitter2 {
  private eventEmitter

  constructor () {
    super()
    this.eventEmitter = new event.EventEmitter2
    this.buildSubscribers()
  }

  push (event: VirtualEvent) {
    this.eventEmitter.emit(event.type, event)
  }

  private buildSubscribers () {
    const clicks = Rx.Observable.fromEvent<VirtualEvent>(this.eventEmitter, 'click')
    const changes = Rx.Observable.fromEvent<VirtualEvent>(this.eventEmitter, 'change')

    clicks
      .buffer(clicks.debounceTime(300))
      .map((clicks) => {
        const isMultipleClick = clicks.every((c) => clicks[0].target.equals(c.target))

        if (isMultipleClick) {
          return clicks
        } else {
          return [clicks[0]]
        }
      })
      .groupBy((clicks) => clicks.length)
      .subscribe((observable) => {
        const clicksCount = observable.key
        if (clicksCount === 1) {
          observable.map((clicks) => clicks[0]).subscribe((event: VirtualEvent) => {
            this.emit('event', event)
          })
        } else {
          observable.map((clicks) => clicks[0]).subscribe((event: VirtualEvent) => {
            event['type'] = 'dblclick'
            this.emit('event', event)
          })
        }
      })

    changes.subscribe((event) => {
      this.emit('event', event)
    })
  }
}
