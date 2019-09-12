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

  it('renders default name prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-number></cws-field-number>')
    const element = await page.find('cws-field-number input')

    expect(element.getAttribute('name')).toEqual('name')
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

  it('renders with default min prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-number></cws-field-number>')
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
    expect(btnElement[0]).toHaveAttribute('disabled')

    component.setAttribute('max', '2')
    await page.waitForChanges()
    expect(component.getAttribute('max')).toEqual('2')
    await element.press('1')
    await element.press('2')
    expect(btnElement[1]).toHaveAttribute('disabled')
  })
})
