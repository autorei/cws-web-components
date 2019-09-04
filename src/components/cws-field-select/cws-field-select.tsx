import { h, Component, Prop, State, Watch } from '@stencil/core'
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
   * Select name prop
   */
  @Prop() name: string = 'name'

  /**
   * Select label prop
   */
  @Prop() label: string = 'Label'

  /**
   * Select helper message
   */
  @Prop() hint?: string

  /**
   * Select no option message message
   */
  @Prop() noOptionsMessage?: string = 'Sem opções'

  /**
   * Select error prop
   */
  @Prop() error: boolean = false

  /**
   * Select disabled prop
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

  @Watch('items')
  watchItemsHandler(newValue: Item[], oldValue: Item[]) {
    if (newValue !== oldValue) {
      this.filteredItems = newValue
      this.searchItems()
    }
  }

  componentWillLoad() {
    this.filteredItems = this.items
  }

  searchItems() {
    this.filteredItems = [...this.items]

    let updatedList = this.filteredItems
    updatedList = updatedList.filter(
      item =>
        item.label
          .toString()
          .toLowerCase()
          .search(this.value.toString().toLowerCase()) !== -1,
    )

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
    if (!this.$optionsList) {
      return
    }

    const $optionItem: HTMLLIElement = this.$optionsList.querySelector(
      `li:nth-child(${this.hoverItemIndex + 1})`,
    )

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

    // Tab
    if (keyCode === 9 && !this.clearIfInvalid && this.filteredItems[this.hoverItemIndex]) {
      this.value = this.filteredItems[this.hoverItemIndex].value
      return
    }

    // Esc
    if (keyCode === 27) {
      this.handleDropDown(false)
      return
    }

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
    this.hoverItemIndex = 0
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
                'cws-field-select-dropdown-icon--up': this.showItems && !this.value,
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
              {this.filteredItems.length ? (
                this.filteredItems.map((item, index) => {
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
                })
              ) : (
                <li class="cws-field-select-no-option">{this.noOptionsMessage}</li>
              )}
            </ul>
          ) : null}
        </div>
        <span class="cws-field-select-hint">{this.hint}</span>
      </div>
    )
  }
}
