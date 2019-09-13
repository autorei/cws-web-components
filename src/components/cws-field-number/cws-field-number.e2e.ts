/* eslint-env jest */
import { newE2EPage } from '@stencil/core/testing'

describe('cws-field-number', () => {
  it('renders', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-number></cws-field-number>')
    const element = await page.find('cws-field-number')
    expect(element).toHaveClass('hydrated')
  })

  it('renders default value prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-number></cws-field-number>')
    const component = await page.find('cws-field-number')

    const input = await page.find('cws-field-number input')
    let componentValue = await component.getProperty('value')
    expect(componentValue).toEqual(1)

    input.press('Backspace')
    input.press('Backspace')

    await input.press('1')
    await input.press('2')

    componentValue = await component.getProperty('value')
    expect(componentValue).toEqual(12)
  })

  it('renders without name prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-number></cws-field-number>')
    const input = await page.find('cws-field-number input')

    await page.waitForChanges()
    expect(input.getAttribute('name')).toBeNull()
  })

  it('renders changes to the name prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-number name="numeric"></cws-field-number>')
    const component = await page.find('cws-field-number')
    const input = await page.find('cws-field-number input')
    expect(input.getAttribute('name')).toEqual('numeric')

    component.setAttribute('name', 'counter')
    await page.waitForChanges()
    expect(input.getAttribute('name')).toEqual('counter')
  })

  it('renders default height prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-number></cws-field-number>')
    const element = await page.find('cws-field-number > div')

    expect(element).toHaveClass('cws-field-number--md')
  })

  it('renders with max prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-number max="99"></cws-field-number>')
    const component = await page.find('cws-field-number')
    const element = await page.find('cws-field-number input')
    expect(component.getAttribute('max')).toEqual('99')
    expect(element.getAttribute('max')).toEqual('99')

    component.setAttribute('max', '2')
    await page.waitForChanges()
    expect(component.getAttribute('max')).toEqual('2')

    await element.press('1')
    await element.press('2')
    await element.press('3')
    await element.press('4')

    expect(component.getAttribute('value')).toEqual('2')
  })

  it('renders with min prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-number min="1"></cws-field-number>')
    const component = await page.find('cws-field-number')
    const element = await page.find('cws-field-number input')
    expect(element.getAttribute('min')).toEqual('1')
    const componentValue = await component.getProperty('value')
    expect(componentValue).toEqual(1)
  })

  it('renders changes to the disabled prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-number disabled></cws-field-number>')
    const element = await page.find('cws-field-number input')
    const btnElement = await page.findAll('cws-field-number button')
    expect(element).toHaveAttribute('disabled')
    expect(btnElement[0]).toHaveAttribute('disabled')
    expect(btnElement[1]).toHaveAttribute('disabled')
  })

  it('renders changes to the disabled button prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-number disabled-button></cws-field-number>')
    const component = await page.find('cws-field-number')
    const element = await page.find('cws-field-number input')
    const btnElement = await page.findAll('cws-field-number button')
    const componentValue = await component.getProperty('value')
    expect(componentValue).toEqual(1)

    component.setAttribute('max', '2')
    await page.waitForChanges()
    expect(component.getAttribute('max')).toEqual('2')
    await element.press('1')
    await element.press('2')
    expect(btnElement[1]).toHaveAttribute('disabled')
  })

  it('renders without and changes the error prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-number></cws-field-number>')
    const component = await page.find('cws-field-number')
    const element = await page.find('cws-field-number .cws-field-number')
    expect(element.getAttribute('class')).not.toContain('cws-field-number--is-error')

    component.setAttribute('error', true)
    await page.waitForChanges()
    expect(element.getAttribute('class')).toContain('cws-field-number--is-error')
  })

  it('renders without hint prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-number></cws-field-number>')
    const element = await page.find('cws-field-number .cws-field-number-hint')

    await page.waitForChanges()
    expect(element.textContent).toEqual('')
  })

  it('renders changes to the hint prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-number hint="Message"></cws-field-number>')
    const component = await page.find('cws-field-number')
    const element = await page.find('cws-field-number .cws-field-number-hint')
    expect(element.textContent).toEqual('Message')

    component.setAttribute('hint', 'Helper Message')
    await page.waitForChanges()
    expect(element.textContent).toEqual('Helper Message')
  })

  it('renders without label prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-number></cws-field-number>')
    const element = await page.find('cws-field-number .cws-field-number-label')

    await page.waitForChanges()
    expect(element.textContent).toEqual('')
  })

  it('renders changes to the label prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-number label="Quantidade"></cws-field-number>')
    const component = await page.find('cws-field-number')
    const element = await page.find('cws-field-number .cws-field-number-label')
    expect(element.textContent).toEqual('Quantidade')

    component.setAttribute('label', 'Numero')
    await page.waitForChanges()
    expect(element.textContent).toEqual('Numero')
  })
})
