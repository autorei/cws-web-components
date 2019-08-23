import { Component, Prop, h } from '@stencil/core'

@Component({
  tag: 'cws-field-text',
  styleUrl: 'cws-field-text.css',
})
export class CwsFieldText {
  /**
   * Input value
   */
  @Prop({ mutable: true }) value: string

  /**
   * Disabled state
   */
  @Prop() disabled: boolean = false

  /**
   * Label
   */
  @Prop() label: string

  render() {
    return (
      <div class="cws-field-text">
        <div class="cws-field-text-wrap">
          <input class="cws-field-text-input" value={this.value} disabled={this.disabled} />
          <label class="cws-field-text-label">{this.label}</label>
        </div>
        <div class="cws-field-text-helper">
          <span class="cws-field-text-helper-message">Texto de ajuda</span>
          <span class="cws-field-text-helper-message error">Mensagem Erro</span>
        </div>
      </div>
    )
  }
}
