import { Component, Prop, h } from '@stencil/core'
import classNames from 'classnames'

@Component({
  tag: 'cws-field-text',
  styleUrl: 'cws-field-text.css',
})
export class CwsFieldText {
  /**
   * Input initial value
   */
  @Prop({
    mutable: true,
    reflect: true,
  })
  value: string = ''

  /**
   * Input name
   */
  @Prop() name: string

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

  /**
   * Field required state
   */
  @Prop() required: boolean = false

  handleChange(event) {
    this.value = event.target.value
  }

  render() {
    return (
      <div
        class={classNames('cws-field-text', {
          'cws-field-text--has-hint': Boolean(this.hint),
          'cws-field-text--has-value': this.value !== '',
          'cws-field-text--is-error': this.error,
        })}
      >
        <div class="cws-field-text-wrap">
          <input
            class="cws-field-text-input"
            value={this.value}
            name={this.name}
            disabled={this.disabled}
            required={this.required}
            onInput={event => this.handleChange(event)}
          />
          {this.label && (
            <label class="cws-field-text-label">
              {this.label}
              {this.required && '*'}
            </label>
          )}
        </div>
        <span class="cws-field-text-hint">{this.hint}</span>
      </div>
    )
  }
}
