import { Component, Prop, h } from '@stencil/core'

@Component({
  tag: 'cws-field-number',
  styleUrl: 'cws-field-number.css',
})
export class CwsFieldNumber {
  /**
   * The first name <-- this commentary is necessary to generate docs
   */
  @Prop() name: string

  render() {
    return <div>Hello, World! I'm {this.name}</div>
  }
}
