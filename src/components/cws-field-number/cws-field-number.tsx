import { Component, Prop, h } from '@stencil/core'

@Component({
  tag: 'cws-field-number',
  styleUrl: 'cws-field-number.css',
})
export class CwsFieldNumber {
  /**
   * Name component prop
   */
  @Prop() name: string = 'name'

  /**
   * Value input prop
   */
  @Prop({
    mutable: true,
    reflect: true,
  })
  value: number

  /**
   * max input prop
   */
  @Prop() max: number

  /**
   * min input prop
   */
  @Prop() min: number

  handleChange(e) {
    this.value = e.target.value
    if (this.value > this.max) {
      this.value = this.max
    }
  }

  handleCounter(state: string) {
    let newValue = this.value

    if (!this.value || !newValue) {
      newValue = 0
    }

    if (state === 'increment') {
      // if(this.min != '1') {
      //   newValue = 0
      // }
      newValue += 1
    }

    if (state === 'decrement') {
      // if(this.min != 1) {
      //   newValue = 1
      // }
      newValue -= 1
    }

    this.value = newValue
  }

  render() {
    const inputValue = this.value > this.max ? this.max : this.value
    console.log(inputValue)
    return (
      <div class="cws-field-number">
        <cws-icon
          class="cws-field-number-button"
          size="xxs"
          icon="minus"
          onClick={() => this.handleCounter('decrement')}
        />
        <input
          class="cws-field-number-counter"
          max={this.max}
          min={this.min}
          type="number"
          value={inputValue}
          onInput={e => this.handleChange(e)}
          onChange={e => this.handleChange(e)}
          name={this.name}
        />
        <cws-icon
          class="cws-field-number-button"
          size="xxs"
          icon="plus"
          onClick={() => this.handleCounter('increment')}
        />
      </div>
    )
  }
}
