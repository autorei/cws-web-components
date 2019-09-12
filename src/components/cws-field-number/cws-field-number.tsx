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
  value: number = 1

  /**
   * Set a max value input prop
   */
  @Prop() max: number

  /**
   * Set a min value to input
   */
  @Prop() min: number = 1

  /**
   * disabled input prop
   */
  @Prop() disabled: boolean = false

  /**
   * If true, disabled only buttons when input value is equal to min and max props
   */
  @Prop() disabledButton: boolean = false

  handleChange(e) {
    this.value = e.target.value
    if (this.value >= this.max) {
      this.value = this.max
    }
  }

  handleKeyDown(e) {
    if (this.value >= this.max) {
      if (e.code !== 'Backspace' && e.code !== 'ArrowDown') {
        e.preventDefault()
      }
    }
  }

  handleCounter(state: string) {
    let newValue = this.value

    if (!this.value || !newValue) {
      newValue = 0
    }

    if (state === 'increment') {
      newValue += 1
    }

    if (state === 'decrement') {
      if (newValue <= 1) {
        return
      }
      newValue -= 1
    }

    this.value = newValue
  }

  render() {
    const inputValue = this.value > this.max ? this.max : this.value
    const maskedValue = inputValue < 10 ? `0${inputValue}` : inputValue
    return (
      <div class="cws-field-number">
        <button
          class="cws-field-number-button"
          onClick={() => this.handleCounter('decrement')}
          disabled={this.disabled || (this.disabledButton && this.value === this.min)}
        >
          <cws-icon size="xxs" icon="minus" />
        </button>
        <input
          class="cws-field-number-counter"
          type="number"
          name={this.name}
          value={maskedValue}
          max={this.max}
          min={this.min}
          disabled={this.disabled}
          onInput={e => this.handleChange(e)}
          onKeyDown={e => this.handleKeyDown(e)}
        />
        <button
          class="cws-field-number-button"
          onClick={() => this.handleCounter('increment')}
          disabled={this.disabled || (this.disabledButton && this.value === this.max)}
        >
          <cws-icon size="xxs" icon="plus" />
        </button>
      </div>
    )
  }
}
