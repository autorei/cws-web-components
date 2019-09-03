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
   * Select required prop
   */
  @Prop() required: boolean = false

  /**
   * Clear field value if no item match with it
   */
  @Prop() clearIfInvalid: boolean = true

  /**
   * Expected an array to populate select
   */
  @Prop() items: Item[] = []

  /**
   * State to show and hide select items
   */
  @State() showItems: boolean = false

  /**
   * State to hover item
   */
  @State() hoverItemIndex: number = 0

  private $optionsList: HTMLUListElement

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

  handleDropDown(showItems: boolean = !this.showItems) {
    this.showItems = showItems
  }

  selectItem(item: Item) {
    this.handleDropDown(false)
    this.value = item.value
    this.filteredItems = [...this.items]
  }

  hoverItem(index: number) {
    this.hoverItemIndex = index
  }

  scrollList() {
    console.log('this.$optionsList ->', this.$optionsList)
    const $optionItem: HTMLLIElement = this.$optionsList.querySelector(
      `li:nth-child(${this.hoverItemIndex + 1})`,
    )

    console.log('$optionItem ->', $optionItem)
    if ($optionItem) {
      this.$optionsList.scrollTop = $optionItem.offsetTop - $optionItem.offsetHeight || 0
    }
  }

  handleKeyDown(event: { keyCode: number }) {
    const { keyCode } = event
    const itemsLength = this.filteredItems.length
    const currentItemIndex = this.hoverItemIndex
    let nextHoverItemIndex = currentItemIndex
    this.handleDropDown(true)

    // Enter
    if (keyCode === 13) {
      this.value = this.filteredItems[this.hoverItemIndex].value
      this.filteredItems = [...this.items]
      this.hoverItemIndex = 0
      this.handleDropDown(false)
      return
    }

    // Down
    if (keyCode === 40) {
      if (nextHoverItemIndex + 1 < itemsLength) {
        nextHoverItemIndex = currentItemIndex + 1
      }
      this.scrollList()
    }

    // Up
    if (keyCode === 38) {
      if (nextHoverItemIndex - 1 >= 0) {
        nextHoverItemIndex = currentItemIndex - 1
      }
      this.scrollList()
    }

    this.hoverItemIndex = nextHoverItemIndex
  }

  onInputBlur() {
    // timeout workaround (aka gambiarra)
    // to prevent close dropdown without setting value when click on item
    window.setTimeout(() => {
      this.handleDropDown(false)
      const selectedItemIndex = this.items.findIndex(item => item.value === this.value)

      if (this.clearIfInvalid && selectedItemIndex === -1) {
        this.value = ''
      }
    }, 100)
  }

  onInputFocus() {
    this.handleDropDown(true)
  }

  onInputChange(event) {
    this.value = event.target.value
    this.showItems = true
    this.searchItems()
  }

  onCloseClick() {
    this.value = ''
  }

  onItemClick(item: Item) {
    this.value = item.value
  }

  render() {
    const selectedItemIndex = this.items.findIndex(item => item.value === this.value)
    const selectedItem = this.items[selectedItemIndex]
    const selectedItemLabel = selectedItem ? selectedItem.label : this.value

    return (
      <div
        class={classNames('cws-field-select', {
          'cws-field-select--has-hint': Boolean(this.hint),
          'cws-field-select--has-value': this.value !== '',
          'cws-field-select--is-error': this.error,
        })}
      >
        <div class="cws-field-select-wrap">
          <div class="cws-field-select-field">
            <input
              class="cws-field-select-input"
              value={selectedItemLabel}
              name={this.name}
              disabled={this.disabled}
              required={this.required}
              onInput={event => this.onInputChange(event)}
              onFocus={this.onInputFocus.bind(this)}
              onBlur={this.onInputBlur.bind(this)}
              onKeyDown={event => this.handleKeyDown(event)}
            />

            <cws-icon
              size="xxs"
              class={classNames('cws-field-select-dropdown-icon', {
                'cws-field-select-dropdown-icon--up': this.showItems,
                'cws-field-select-dropdown-icon--down': !this.showItems,
                'cws-field-select-dropdown-icon--close': Boolean(this.value),
              })}
              onClick={this.value ? this.onCloseClick.bind(this) : null}
              icon={this.value ? 'close' : 'arrow-down'}
            />

            {this.label && (
              <label class="cws-field-select-label">
                {this.label}
                {this.required && '*'}
              </label>
            )}
          </div>
          {this.showItems ? (
            <ul
              ref={$element => {
                this.$optionsList = $element
              }}
              class="cws-field-select-options"
            >
              {this.filteredItems.map((item, index) => {
                return (
                  <li
                    key={item.value}
                    onMouseEnter={() => this.hoverItem(index)}
                    onMouseDown={() => this.onItemClick(item)}
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
