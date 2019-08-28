import { Component, Prop, h, State } from '@stencil/core'
import classNames from 'classnames'

@Component({
  tag: 'cws-field-select',
  styleUrl: 'cws-field-select.css',
})
export class CwsFieldSelect {
  /**
   * Input value
   */
  @Prop({
    mutable: true,
    reflect: true,
  })
  value: string = ''

  /**
   * Input name prop
   */
  @Prop() name: string = 'name'

  /**
   * Input label prop
   */
  @Prop() label: string = 'Label'

  /**
   * Input helper message
   */
  @Prop() hint?: string

  /**
   * Input error prop
   */
  @Prop() error: boolean = false

  /**
   * Input disabled prop
   */
  @Prop() disabled: boolean = false

  /**
   * Input required prop
   */
  @Prop() required: boolean = false

  /**
   * Array to recieve select items
   */
  @State() items: any

  /**
   * State to show and hide select items
   */
  @State() showItems: boolean = false

  componentWillLoad() {
    this.items = [
      { value: 'Inactive Item', id: 1 },
      { value: 'Hover Item', id: 2 },
      { value: 'Selected Item', id: 3 },
      { value: 'Inactive Item', id: 4 },
    ]
  }

  selectedItem = this.items && this.items[0]

  handleChange(event) {
    this.value = event.target.value
  }

  handleDropDown() {
    this.showItems = !this.showItems
  }

  selectItem(item) {
    this.selectedItem = item
    this.showItems = false
  }

  render() {
    return (
      <div
        class={classNames('cws-field-select', {
          'cws-field-select--has-hint': Boolean(this.hint),
          'cws-field-select--has-value': this.value !== '',
          'cws-field-select--is-error': this.error,
        })}
      >
        <div class="cws-field-select-wrap">
          <div class="cws-field-select-input">
            <input
              value={this.value}
              name={this.name}
              disabled={this.disabled}
              required={this.required}
              onInput={event => this.handleChange(event)}
              onClick={() => this.handleDropDown()}
              // onBlur={() => this.handleDropDown()}
            />
            <div class="cws-field-select--dropdown-icon">
              <span
                class={classNames('dropdown-icon', {
                  'dropdown-icon--up': Boolean(this.showItems),
                  'dropdown-icon--down': Boolean(!this.showItems),
                })}
              ></span>
            </div>

            {this.label && (
              <label class="cws-field-select-label">
                {this.label}
                {this.required && '*'}
              </label>
            )}
          </div>
          <ul
            class="cws-field-select--options"
            style={{ display: this.showItems ? 'block' : 'none' }}
          >
            {this.items.map(item => {
              return (
                <li
                  id={item.id}
                  onClick={() => this.selectItem(item)}
                  class={this.selectedItem === item && 'selected'}
                >
                  {item.value}
                </li>
              )
            })}
          </ul>
        </div>
        <span class="cws-field-select-hint">{this.hint}</span>
      </div>
    )
  }
}
