import Step from './Step'
import * as event from 'eventemitter2'

export default class Script extends event.EventEmitter2 {
  private steps: Step[]

  constructor () {
    super()
    this.steps = []
  }

  get lastStep () {
    return this.steps.length > 0 ? this.steps[this.steps.length - 1] : null
  }

  toArray () {
    return this.steps
  }

  insertStep (step: Step) {
    this.steps.push(step)
    this.emit('stepInserted', { step: step, index: this.steps.length - 1})
    this.emit('changed', { steps: this.toArray() })
  }

  removeStep (index: number) {
    const removedSteps = this.steps.splice(index, 1)
    this.emit('stepRemoved', { step: removedSteps[0], index: index})
    this.emit('changed', { steps: this.toArray() })

    return removedSteps[0]
  }

  replaceLastStep (newStep: Step) {
    this.replaceStep(newStep, this.steps.length - 1)
  }

  replaceStep (newStep: Step, index: number) {
    this.steps[index] = newStep
    this.emit('stepReplaced', { step: newStep, index: index })
    this.emit('changed', { steps: this.toArray() })
  }
}
