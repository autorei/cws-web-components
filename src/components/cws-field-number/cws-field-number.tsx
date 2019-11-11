import { Component, Prop, h } from '@stencil/core'
import classNames from 'classnames'

@Component({
  tag: 'cws-field-number',
  styleUrl: 'cws-field-number.css',
})
export class CwsFieldNumber {
  /**
   * Value input prop
   */
  @Prop({
    mutable: true,
    reflect: true,
  })
  value: number = 1

  /**
   * Name component prop
   */
  @Prop() name: string

  /**
   * Input height
   */
  @Prop() height: 'lg' | 'md' | 'sm' = 'md'

  /**
   * Component error state
   */
  @Prop() error: boolean = false

  /**
   * Input hint message
   */
  @Prop() hint?: string

  /**
   * Input hint message
   */
  @Prop() label?: string

  /**
   * Set a max value input prop
   */
  @Prop() max?: number

  /**
   * Set a min value to input
   */
  @Prop() min?: number

  /**
   * disabled input prop
   */
  @Prop() disabled: boolean = false

  /**
   * If true, disabled only buttons when input value is equal to min and max props
   */
  @Prop() disabledButton: boolean = false

  handleMinAndMax(value) {
    let newValue
    if (value > this.max) {
      newValue = this.max
    } else if (value < this.min) {
      newValue = this.min
    } else {
      newValue = value
    }
    return newValue
  }

  handleChange(e) {
    this.value = e.target.value
    if (this.value >= this.max) {
      this.value = this.max
    } else if (this.value <= this.min) {
      this.value = this.min
    }
  }

  handleKeyDown(e) {
    if (this.value >= this.max) {
      if (e.code !== 'Backspace' && e.code !== 'ArrowDown') {
        e.preventDefault()
      }
    } else if (this.value <= this.min) {
      if (e.code !== 'Backspace' && e.code !== 'ArrowUp') {
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
    if (newValue > this.max || newValue < this.min) {
      return
    }
    this.value = newValue
  }

  render() {
    const inputValue = this.handleMinAndMax(this.value)
    // this.value > this.max ? this.max : this.value < this.min ? this.min : this.value
    const maskedValue = inputValue < 10 ? `0${inputValue}` : inputValue
    const fieldNumberClasses = classNames('cws-field-number', `cws-field-number--${this.height}`, {
      'cws-field-number--is-error': this.error,
      'cws-field-number--has-hint': Boolean(this.hint),
    })
    return (
      <div class={fieldNumberClasses}>
        <span class="cws-field-number-label">{this.label}</span>
        <div class="cws-field-number-wrapper">
          <button
            class="cws-field-number-button"
            data-test="decrement"
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
            data-test="increment"
            onClick={() => this.handleCounter('increment')}
            disabled={this.disabled || (this.disabledButton && this.value === this.max)}
          >
            <cws-icon size="xxs" icon="plus" />
          </button>
        </div>
        <span class="cws-field-number-hint">{this.hint}</span>
      </div>
    )
  }
}
