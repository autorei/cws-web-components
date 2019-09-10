import { Component, Prop, h } from '@stencil/core'
import classNames from 'classnames'

@Component({
  tag: 'cws-field-button',
  styleUrl: 'cws-field-button.css',
})
export class CwsFieldButton {
  /**
   * component Name
   */
  @Prop() name: string

  /**
   * Input width inline (default: blocked)
   */
  @Prop() inline: boolean = false

  render() {
    return (
      <div
        class={classNames('cws-field-button-wrapper', {
          'cws-field-button-inline': this.inline,
        })}
      >
        <cws-field-text
          class="cws-field-button-input"
          label="Cód de desconto"
          name="coupon"
          inline={this.inline}
        />
        <cws-button class="cws-field-button-knob" size="inside" type="button">
          Aplicar
        </cws-button>
      </div>
    )
  }
}
