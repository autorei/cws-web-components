import { Component, Prop, h } from '@stencil/core'
import classNames from 'classnames'

@Component({
  tag: 'cws-field-button',
  styleUrl: 'cws-field-button.css',
})
export class CwsFieldButton {
  /**
   * component value
   */
  @Prop({
    mutable: true,
    reflect: true,
  })
  value: string = ''

  /**
   * component Name
   */
  @Prop() name: string

  /**
   * Input label
   */
  @Prop() label: string = 'Label'

  /**
   * Input type
   */
  @Prop() inputType: 'text' | 'password' | 'email' = 'text'

  /**
   * Input required state
   */
  @Prop() required: boolean = false

  /**
   *  Input and Button disabled state
   */
  @Prop() disabled: boolean = false

  /**
   * Input error state
   */
  @Prop() error: boolean = false

  /**
   * Input hint message
   */
  @Prop() hint?: string

  /**
   * Input width inline (default: blocked)
   */
  @Prop() inline: boolean = false

  /**
   * Button label
   */
  @Prop() buttonLabel: string = 'Enviar'

  /**
   * Button Autofocus state
   */
  @Prop() autofocus: boolean = false

  /**
   * Button style
   */
  @Prop() variant: 'primary' | 'secondary' = 'primary'

  /**
   * Button type, not applicable if the component receive `href` prop
   */
  @Prop() buttonType: 'button' | 'submit' | 'reset' = 'button'

  /**
   * Button href to redirect user. It render an anchor tag (`<a></a>`) instead of a button one
   */
  @Prop() href?: string

  handleChange(event) {
    this.value = event.target.value
  }

  render() {
    return (
      <div
        class={classNames('cws-field-button-wrapper', {
          'cws-field-button-inline': this.inline,
        })}
      >
        <cws-field-text
          class="cws-field-button-input"
          value={this.value}
          label={this.label}
          type={this.inputType}
          name={this.name}
          required={this.required}
          disabled={this.disabled}
          error={this.error}
          hint={this.hint}
          inline={this.inline}
          onInput={e => this.handleChange(e)}
        />
        <cws-button
          class="cws-field-button-knob"
          variant={this.variant}
          size="inside"
          type={this.buttonType}
          autofocus={this.autofocus}
          disabled={this.disabled}
        >
          {this.buttonLabel}
        </cws-button>
      </div>
    )
  }
}
