/* eslint-env jest */
import { newE2EPage } from '@stencil/core/testing'

describe('cws-field-select', () => {
  it('renders', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-select label="Name" name="input"></cws-field-select>')
    const element = await page.find('cws-field-select')
    expect(element).toHaveClass('hydrated')
  })

  it('renders default value prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-select value="Lorem ipsum"></cws-field-select>')

    const component = await page.find('cws-field-select')

    const arrowIcon = await page.find('cws-icon')
    expect(arrowIcon).toHaveClass('cws-field-select-dropdown-icon--close')

    const element = await page.find('cws-field-select > div')

    expect(element).toHaveClass('cws-field-select--has-value')

    const input = await page.find('cws-field-select input')
    let componentValue = await component.getProperty('value')
    expect(componentValue).toEqual('Lorem ipsum')

    input.press('Backspace')
    input.press('Backspace')
    input.press('Backspace')
    input.press('Backspace')
    input.press('Backspace')
    input.press('Backspace')
    input.press('Backspace')
    input.press('Backspace')
    input.press('Backspace')
    input.press('Backspace')
    input.press('Backspace')

    await input.press('H')
    await input.press('E')
    await input.press('L')
    await input.press('L')
    await input.press('O')

    componentValue = await component.getProperty('value')
    expect(componentValue).toEqual('HELLO')
  })

  it('renders default name prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-select></cws-field-select>')
    const element = await page.find('cws-field-select input')

    await page.waitForChanges()
    expect(element.getAttribute('name')).toEqual('name')
  })

  it('renders changes to the name prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-select></cws-field-select>')
    const component = await page.find('cws-field-select')
    const element = await page.find('cws-field-select input')
    expect(element.getAttribute('name')).toEqual('name')

    component.setAttribute('name', 'phone')
    await page.waitForChanges()
    expect(element.getAttribute('name')).toEqual('phone')
  })

  it('renders default label prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-select></cws-field-select>')
    const element = await page.find('cws-field-select label')

    await page.waitForChanges()
    expect(element.textContent).toEqual('Label')
  })

  it('renders changes to the label prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-select></cws-field-select>')
    const component = await page.find('cws-field-select')
    const element = await page.find('cws-field-select label')
    expect(element.textContent).toEqual('Label')

    component.setProperty('label', 'Email')
    await page.waitForChanges()
    expect(element.textContent).toEqual('Email')
  })

  it('renders without hint prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-select></cws-field-select>')
    const element = await page.find('cws-field-select .cws-field-select-hint')

    await page.waitForChanges()
    expect(element.textContent).toEqual('')
  })

  it('renders changes to the hint prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-select hint="Message"></cws-field-select>')
    const component = await page.find('cws-field-select')
    const element = await page.find('cws-field-select span')
    expect(element.textContent).toEqual('Message')

    component.setAttribute('hint', 'Helper Message')
    await page.waitForChanges()
    expect(element.textContent).toEqual('Helper Message')
  })

  it('renders default noOptionsMessage prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-select value="Lorem ipsum"></cws-field-select>')
    const component = await page.find('cws-field-select')
    const componentValue = await component.getProperty('value')
    expect(componentValue).toEqual('Lorem ipsum')

    const componentInput = await page.find('cws-field-select input')
    await componentInput.focus()

    const element = await page.find('.cws-field-select-options')
    expect(element.textContent).toEqual('Sem opções')
  })

  it('renders changes to the noOptionsMessage prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-select value="Lorem ipsum"></cws-field-select>')
    const component = await page.find('cws-field-select')
    const componentInput = await page.find('cws-field-select input')
    await componentInput.focus()

    component.setProperty('noOptionsMessage', 'Nenhuma opção')
    const element = await page.find('.cws-field-select-options')
    await page.waitForChanges()
    expect(element.textContent).toEqual('Nenhuma opção')
  })

  it('renders without and change the error prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-select></cws-field-select>')
    const component = await page.find('cws-field-select')
    const element = await page.find('cws-field-select > .cws-field-select')
    expect(element.getAttribute('class')).not.toContain('cws-field-select--is-error')

    component.setAttribute('error', true)
    await page.waitForChanges()
    expect(element.getAttribute('class')).toContain('cws-field-select--is-error')
  })

  it('renders with disabled prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-select disabled></cws-field-select>')
    const element = await page.find('cws-field-select input')
    expect(element).toHaveAttribute('disabled')
  })

  it('renders with required prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-select required></cws-field-select>')
    const element = await page.find('cws-field-select input')
    expect(element).toHaveAttribute('required')
  })

  it('renders with required prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-select clearIfInvalid></cws-field-select>')
    const component = await page.find('cws-field-select')
    expect(component).toHaveAttribute('clearIfInvalid')
  })

  it('render with select items', async () => {
    const page = await newE2EPage()
    await page.setContent('<cws-field-select></cws-field-select>')
    const component = await page.find('cws-field-select')

    const arr = [
      { label: 'Stencil', value: '1' },
      { label: 'Google', value: '2' },
      { label: 'React', value: '3' },
      { label: 'JavaScript', value: '4' },
      { label: 'Polymer', value: '5' },
    ]

    component.setAttribute('items', arr)
    await page.waitForChanges()
    expect(component).toHaveAttribute('items')
    expect(component.getAttribute('items')).toContain(arr)
  })

  it('showItems is true', async () => {
    const page = await newE2EPage()
    await page.setContent('<cws-field-select></cws-field-select>')

    const arrowIcon = await page.find('cws-icon')
    expect(arrowIcon).toHaveClass('cws-field-select-dropdown-icon--down')
    expect(arrowIcon).not.toHaveClass('cws-field-select-dropdown-icon--up')

    const componentInput = await page.find('cws-field-select input')
    await componentInput.focus()

    expect(arrowIcon).toHaveClass('cws-field-select-dropdown-icon--up')
    expect(arrowIcon).not.toHaveClass('cws-field-select-dropdown-icon--down')

    const element = await page.find('.cws-field-select-options')
    expect(element).toBeTruthy()
  })

  it('selected item option', async () => {
    const page = await newE2EPage()
    await page.setContent('<cws-field-select></cws-field-select>')

    const componentInput = await page.find('cws-field-select input')
    await componentInput.focus()

    const arrowIcon = await page.find('cws-icon')
    expect(arrowIcon).toHaveClass('cws-field-select-dropdown-icon--up')
    expect(arrowIcon).not.toHaveClass('cws-field-select-dropdown-icon--down')

    const element = await page.find('.cws-field-select-options')
    expect(element).toBeTruthy()
  })
})
