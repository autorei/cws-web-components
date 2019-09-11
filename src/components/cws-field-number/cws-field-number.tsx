import { Component, Prop, h } from '@stencil/core'

@Component({
  tag: 'cws-field-number',
  styleUrl: 'cws-field-number.css',
})
export class CwsFieldNumber {
  /**
   * Name component prop
   */
  @Prop() name: string

  /**
   * value prop
   */
  @Prop({
    mutable: true,
    reflect: true,
  })
  value: string = '0'

  /**
   * Max number lenth prop
   */
  @Prop() maxLength: number = 4

  /**
   * If true, the input will not have negative numbers.
   */
  @Prop() onlyPositiveNumbers: boolean = false

  onlyNumbers = (value: string) => value.replace(/(^-{1})|(\d)|(\D)/g, '$1$2')

  handleChange(e) {
    this.value = this.onlyNumbers(e.target.value)
  }

  handleCounter(state: string) {
    let newValue = parseInt(this.value, 10)

    if (!this.value || !newValue) {
      newValue = 0
    }

    if (newValue <= 0 && this.onlyPositiveNumbers) {
      return
    }

    if (state === 'increment') {
      newValue += 1
    }

    if (state === 'decrement') {
      newValue -= 1
    }

    this.value = newValue.toString()
  }

  render() {
    return (
      <div class="cws-field-number">
        <span class="cws-field-number-button" onClick={() => this.handleCounter('decrement')}>
          &ndash;
        </span>
        <input
          class="cws-field-number-counter"
          maxlength={this.maxLength}
          type="text"
          value={this.value}
          onInput={e => this.handleChange(e)}
        />
        <span class="cws-field-number-button" onClick={() => this.handleCounter('increment')}>
          +
        </span>
      </div>
    )
  }
}
