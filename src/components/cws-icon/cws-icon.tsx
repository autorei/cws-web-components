import { Component, Prop, h } from '@stencil/core'
import classNames from 'classnames'
import icons from './icons'

@Component({
  tag: 'cws-icon',
  styleUrl: 'cws-icon.css',
})
export class CwsIcon {
  /**
   * Icon slug
   */
  @Prop() icon?: string

  /**
   * Icon size
   */
  @Prop() size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'sm'

  render() {
    if (this.icon) {
      return (
        <div
          class={classNames('cws-icon', `cws-icon--${this.icon}`, `cws-icon--${this.size}`)}
          innerHTML={icons[this.icon]}
        />
      )
    }

    return (
      <div class={classNames('cws-icon', `cws-icon--${this.size}`)}>
        <slot />
      </div>
    )
  }
}
