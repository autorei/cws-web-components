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
    expect(componentValue).toEqual('0')

    input.press('Backspace')
    input.press('Backspace')

    await input.press('1')
    await input.press('2')

    componentValue = await component.getProperty('value')
    expect(componentValue).toEqual('12')
  })

  it('value is not a number', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-number></cws-field-number>')
    const component = await page.find('cws-field-number')

    const input = await page.find('cws-field-number input')
    let componentValue = await component.getProperty('value')
    expect(componentValue).toEqual('0')

    await input.press('a')
    await input.press('b')

    componentValue = await component.getProperty('value')
    expect(componentValue).toEqual('0')
  })

  it('renders default name prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-number></cws-field-number>')
    const element = await page.find('cws-field-number input')

    expect(element.getAttribute('name')).toEqual('name')
  })

  it('renders default maxLength prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-number></cws-field-number>')
    const element = await page.find('cws-field-number input')

    expect(element.getAttribute('maxLength')).toEqual('4')
  })

  it('renders changes to the maxLength prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-number></cws-field-number>')
    const component = await page.find('cws-field-number')
    const element = await page.find('cws-field-number input')
    expect(element.getAttribute('maxLength')).toEqual('4')

    component.setAttribute('max-length', '2')
    await page.waitForChanges()
    expect(element.getAttribute('maxLength')).toEqual('2')
  })

  it('renders default maxLength prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-number></cws-field-number>')
    const element = await page.find('cws-field-number input')

    expect(element.getAttribute('maxLength')).toEqual('4')
  })

  it('renders with onlyPositiveNumbers', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-number only-positive-numbers></cws-field-number>')
    const component = await page.find('cws-field-number')

    expect(component.getAttribute('onlyPositiveNumbers')).toBeTruthy()
  })
})
