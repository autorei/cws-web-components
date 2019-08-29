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
   * Expected an array to populate select
   */
  @Prop() items: any[]

  /**
   * State to show and hide select items
   */
  @State() showItems: boolean = false

  private filteredItems: any[] = []

  componentWillLoad() {
    this.items = this.items
    this.filteredItems = this.items
  }

  searchItems() {
    this.filteredItems = [...this.items]

    let updatedList = this.filteredItems
    updatedList = updatedList.filter(item => {
      return item.value.toLowerCase().search(this.value.toLowerCase()) !== -1
    })

    this.filteredItems = updatedList
  }

  handleChange(event) {
    this.value = event.target.value
    this.showItems = true
    this.searchItems()
  }

  handleDropDown() {
    this.showItems = !this.showItems
  }

  selectItem(item) {
    this.showItems = false
    this.value = item.value
    this.filteredItems = [...this.items]
  }

  // handleKeyPress(event) {
  //   let key = event.keyCode

  //   if (key === 13) {
  //     console.log('enter')
  //   }
  //   if (key === 40) {
  //     console.log('down')
  //   } else if (key === 38) {
  //     console.log('up')
  //   }
  // }

  render() {
    return (
      <div
        class={classNames('cws-field-select', {
          'cws-field-select--has-hint': Boolean(this.hint),
          'cws-field-select--has-value': this.value !== '',
          'cws-field-select--is-error': !this.filteredItems.length,
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
              // onKeyUp={event => this.handleKeyPress(event)}
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
            class={classNames('cws-field-select--options', {
              'cws-field-select--opened': this.showItems,
            })}
          >
            {this.filteredItems.map(item => {
              return (
                <li
                  id={item.id}
                  onClick={() => this.selectItem(item)}
                  class={classNames('cws-field-select--options-value', {
                    selected: this.value === item.value,
                  })}
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
