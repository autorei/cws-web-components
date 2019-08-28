import { Component, Prop, h } from '@stencil/core'

@Component({
  tag: 'cws-field-select',
  styleUrl: 'cws-field-select.css',
})
export class CwsFieldSelect {
  /**
   * The first name <-- this commentary is necessary to generate docs
   */
  @Prop() name: string

  render() {
    return <div>Hello, World! I'm {this.name}</div>
  }
}
