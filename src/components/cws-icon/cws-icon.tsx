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

  render() {
    if (this.icon) {
      return (
        <div
          class={classNames('cws-icon', `cws-icon--${this.icon}`)}
          innerHTML={icons[this.icon]}
        />
      )
    }

    return (
      <div class="cws-icon">
        <slot />
      </div>
    )
  }
}
