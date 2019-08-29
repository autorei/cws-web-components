import { Component, Prop, h, State } from '@stencil/core'
import classNames from 'classnames'

interface Item {
  value: string
  label: string
}

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
  @Prop() items: Item[]

  /**
   * State to show and hide select items
   */
  @State() showItems: boolean = false

  /**
   * State to hover item
   */
  @State() hoverItemIndex: number = 0

  private filteredItems: Item[] = []

  componentWillLoad() {
    this.items = this.items
    this.filteredItems = this.items
  }

  searchItems() {
    this.filteredItems = [...this.items]

    let updatedList = this.filteredItems
    updatedList = updatedList.filter(item => {
      return (
        item.label
          .toString()
          .toLowerCase()
          .search(this.value.toString().toLowerCase()) !== -1
      )
    })

    this.filteredItems = updatedList
  }

  handleChange(event) {
    this.value = event.target.value
    this.showItems = true
    this.searchItems()
  }

  handleDropDown(showItems: boolean = !this.showItems) {
    this.showItems = showItems
  }

  selectItem(item: Item) {
    this.showItems = false
    this.value = item.value
    this.filteredItems = [...this.items]
  }

  hoverItem(index: number) {
    this.hoverItemIndex = index
  }

  handleKeyDown(event: { keyCode: number }) {
    const { keyCode } = event
    const itemsLength = this.filteredItems.length
    const currentItemIndex = this.hoverItemIndex
    let nextHoverItemIndex = currentItemIndex

    // Enter
    if (keyCode === 13) {
      this.value = this.filteredItems[this.hoverItemIndex].value
      this.hoverItemIndex = 0
      this.handleDropDown(false)
      return
    }

    // Down
    if (keyCode === 40) {
      if (nextHoverItemIndex + 1 < itemsLength) {
        nextHoverItemIndex = currentItemIndex + 1
      }
    }

    // Up
    if (keyCode === 38) {
      if (nextHoverItemIndex - 1 >= 0) {
        nextHoverItemIndex = currentItemIndex - 1
      }
    }

    this.hoverItemIndex = nextHoverItemIndex
  }

  render() {
    const selectedItemIndex = this.items.findIndex(item => item.value === this.value)
    const selectedItem = this.items[selectedItemIndex]
    const selectedItemLabel = selectedItem ? selectedItem.label : ''

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
              value={selectedItemLabel}
              name={this.name}
              disabled={this.disabled}
              required={this.required}
              onInput={event => this.handleChange(event)}
              onFocus={() => this.handleDropDown(true)}
              onBlur={() => this.handleDropDown(false)}
              onKeyDown={event => this.handleKeyDown(event)}
            />
            <div class="cws-field-select--dropdown-icon">
              <span
                class={classNames('dropdown-icon', {
                  'dropdown-icon--up': this.showItems,
                  'dropdown-icon--down': !this.showItems,
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
          {this.showItems ? (
            <ul class="cws-field-select-options">
              {this.filteredItems.map((item, index) => {
                return (
                  <li
                    key={item.value}
                    onClick={() => this.selectItem(item)}
                    onMouseEnter={() => this.hoverItem(index)}
                    class={classNames('cws-field-select-option', {
                      'cws-field-select-option--is-selected': this.value === item.value,
                      'cws-field-select-option--is-over': this.hoverItemIndex === index,
                    })}
                  >
                    {item.label}
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>
        <span class="cws-field-select-hint">{this.hint}</span>
      </div>
    )
  }
}
