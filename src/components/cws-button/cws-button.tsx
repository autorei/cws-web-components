import { Component, Prop, h } from '@stencil/core'
import classNames from 'classnames'
import formatUrl from '../../utils/format-url'

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
  @Prop() size: 'lg' | 'md' | 'sm' | 'inside-field' = 'md'

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

    const formatatedHref = this.href ? formatUrl(this.href) : null
    const currentDomain = window.location.host
    const hrefIsExternal = formatatedHref ? formatatedHref.indexOf(currentDomain) === -1 : null

    return (
      <TagType
        type={!this.href ? this.type : null}
        disabled={!this.href ? this.disabled : null}
        autoFocus={this.autofocus}
        href={formatatedHref}
        target={hrefIsExternal ? '_blank' : null}
        rel={hrefIsExternal ? 'nofollow' : null}
        class={buttonClasses}
      >
        <slot />
      </TagType>
    )
  }
}
