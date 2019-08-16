import { Component, Prop, h } from '@stencil/core'
import classNames from 'classnames'

@Component({
  tag: 'cws-button',
  styleUrl: 'cws-button.css',
})
export class CwsButton {
  /**
   * Button style
   */
  @Prop() variant: 'primary' | 'secondary' = 'primary'

  /**
   * Button size
   */
  @Prop() size: 'lg' | 'md' | 'sm' = 'md'

  /**
   * Button type, not applicable if the component receive `href` prop
   */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button'

  /**
   * Disabled state, not applicable if the component receive the `href` prop
   */
  @Prop() disabled: boolean = false

  /**
   * Autofocus state
   */
  @Prop() autofocus: boolean = false

  /**
   * href to redirect user. It render an anchor tag (`<a></a>`) instead of a button one
   */
  @Prop() href?: string

  render() {
    const TagType = this.href ? 'a' : 'button'

    const buttonClasses = classNames(
      'cws-button',
      `cws-button--${this.size}`,
      `cws-button--${this.variant}`,
      {
        'cws-button--disabled': this.disabled,
      },
    )

    return (
      <TagType
        type={!this.href ? this.type : null}
        disabled={!this.href ? this.disabled : null}
        autoFocus={this.autofocus}
        href={this.href}
        class={buttonClasses}
      >
        <slot />
      </TagType>
    )
  }
}
