/* eslint-env jest */
import { newE2EPage } from '@stencil/core/testing'

describe('cws-field-text', () => {
  it('renders', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-text label="Name" name="input"></cws-field-text>')
    const element = await page.find('cws-field-text')
    expect(element).toHaveClass('hydrated')
  })

  it('renders without name prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-text></cws-field-text>')
    const input = await page.find('cws-field-text input')

    await page.waitForChanges()
    expect(input.getAttribute('name')).toBeNull()
  })

  it('renders changes to the name prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-text name="email"></cws-field-text>')
    const component = await page.find('cws-field-text')
    const input = await page.find('cws-field-text input')
    expect(input.getAttribute('name')).toEqual('email')

    component.setAttribute('name', 'phone')
    await page.waitForChanges()
    expect(input.getAttribute('name')).toEqual('phone')
  })

  it('renders changes to the type prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-text type="text"></cws-field-text>')
    const component = await page.find('cws-field-text')
    const input = await page.find('cws-field-text input')

    component.setAttribute('type', 'password')
    await page.waitForChanges()
    expect(input.getAttribute('type')).toEqual('password')

    component.setAttribute('type', 'email')
    await page.waitForChanges()
    expect(input.getAttribute('type')).toEqual('email')
  })

  it('renders changes to the required prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-text required></cws-field-text>')
    const element = await page.find('cws-field-text input')
    expect(element).toHaveAttribute('required')
  })

  it('renders changes to the disabled prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-text disabled></cws-field-text>')
    const element = await page.find('cws-field-text input')
    expect(element).toHaveAttribute('disabled')
  })

  it('renders with inline prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-text inline></cws-field-text>')
    const element = await page.find('cws-field-text')
    expect(element).toHaveAttribute('inline')
  })

  it('renders without label prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-text></cws-field-text>')
    const element = await page.find('cws-field-text label')

    expect(element).toBeNull()
  })

  it('renders changes to the label prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-text label="Name"></cws-field-text>')
    const component = await page.find('cws-field-text')
    const element = await page.find('cws-field-text label')
    expect(element.textContent).toEqual('Name')

    component.setProperty('label', 'Email')
    await page.waitForChanges()
    expect(element.textContent).toEqual('Email')
  })

  it('renders without hint prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-text></cws-field-text>')
    const element = await page.find('cws-field-text .cws-field-text-hint')

    await page.waitForChanges()
    expect(element.textContent).toEqual('')
  })

  it('renders changes to the hint prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-text hint="Message"></cws-field-text>')
    const component = await page.find('cws-field-text')
    const element = await page.find('cws-field-text span')
    expect(element.textContent).toEqual('Message')

    component.setAttribute('hint', 'Helper Message')
    await page.waitForChanges()
    expect(element.textContent).toEqual('Helper Message')
  })

  it('renders without and changes the error prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-text></cws-field-text>')
    const component = await page.find('cws-field-text')
    const element = await page.find('cws-field-text > .cws-field-text')
    expect(element.getAttribute('class')).not.toContain('cws-field-text--is-error')

    component.setAttribute('error', true)
    await page.waitForChanges()
    expect(element.getAttribute('class')).toContain('cws-field-text--is-error')
  })

  it('renders default value prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-text value="Lorem ipsum"></cws-field-text>')

    const component = await page.find('cws-field-text')

    const element = await page.find('cws-field-text > div')

    expect(element).toHaveClass('cws-field-text--has-value')

    const input = await page.find('cws-field-text input')
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
})
