import { Component, Prop, h } from '@stencil/core'
import classNames from 'classnames'

@Component({
  tag: 'cws-field-button-wrapper',
  styleUrl: 'cws-field-button-wrapper.css',
})
export class CwsFieldButtonWrapper {
  /**
   * Input width inline (default: blocked)
   */
  @Prop() inline: boolean = false

  render() {
    return (
      <div
        class={classNames('cws-field-button-wrapper', {
          'cws-field-button-wrapper-inline': this.inline,
        })}
      >
        <slot />
      </div>
    )
  }
}
