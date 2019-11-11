import { Component, Prop, h } from '@stencil/core'
import classNames from 'classnames'

@Component({
  tag: 'cws-modal',
  styleUrl: 'cws-modal.css',
})
export class CwsModal {
  /**
   * The first name <-- this commentary is necessary to generate docs
   */
  @Prop() name: string

  /**
   * The Open prop <-- If true, the modal is open.
   */
  @Prop() open: boolean = false

  /**
   * The Transparent prop <-- If true, the modal is open with transparent mode.
   */
  @Prop() transparent: boolean = false

  render() {
    return (
      <div
        class={classNames('overlay', {
          'is-visible': this.open,
          'is-transparent': this.transparent,
        })}
      >
        <div class="modal-window">
          <div class="modal-window__content">
            <slot></slot>
          </div>
        </div>
      </div>
    )
  }
}
