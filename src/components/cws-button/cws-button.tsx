import { Component, Prop, h } from '@stencil/core'
import classNames from 'classnames'

@Component({
  tag: 'cws-button',
  styleUrl: 'cws-button.css',
})

export class CwsButton {
  @Prop() variant: 'primary' | 'secondary' = 'primary';
  @Prop() size: 'lg' | 'md' | 'sm' = 'md';
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';
  @Prop() href?: string;
  @Prop() disabled: boolean = false;
  @Prop() autofocus: boolean = false;

  render() {
    const TagType = this.href ? 'a' : 'button'

    const buttonClasses = classNames(
      'cws-button',
      `cws-button--${this.size}`,
      `cws-button--${this.variant}`,
      {
        'cws-button--disabled': this.disabled
      }
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
