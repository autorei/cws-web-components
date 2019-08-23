import { Component, Prop, State, h } from '@stencil/core'
import classNames from 'classnames'

@Component({
  tag: 'cws-field-text',
  styleUrl: 'cws-field-text.css',
})
export class CwsFieldText {
  /**
   * Input initial value
   */
  @State() value: string = ''

  /**
   * Input disabled state
   */
  @Prop() disabled: boolean = false

  /**
   * Field label
   */
  @Prop() label: string

  /**
   * Field error state
   */
  @Prop() error: boolean = false

  /**
   * Hint message
   */
  @Prop() hint?: string

  handleChange(event) {
    this.value = event.target.value
  }

  render() {
    return (
      <div
        class={classNames('cws-field-text', {
          'cws-field-text--filled': this.value !== '',
          'cws-field-text--error': this.error,
        })}
      >
        <div class="cws-field-text-wrap">
          <input
            class="cws-field-text-input"
            value={this.value}
            disabled={this.disabled}
            onInput={event => this.handleChange(event)}
          />
          <label class="cws-field-text-label">{this.label}</label>
        </div>
        <div class="cws-field-text-hint">
          {this.hint && <span class="cws-field-text-hint-message">{this.hint}</span>}
        </div>
      </div>
    )
  }
}
