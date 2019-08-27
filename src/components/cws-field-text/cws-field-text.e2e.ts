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
    const component = await page.find('cws-field-text')

    await page.waitForChanges()
    expect(component.getAttribute('name')).toBeNull()
  })

  it('renders changes to the name prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-text name="input"></cws-field-text>')
    const component = await page.find('cws-field-text')
    expect(component.getAttribute('name')).toContain('input')

    component.setAttribute('name', 'cws-input')
    await page.waitForChanges()
    expect(component.getAttribute('name')).toContain('cws-input')
  })

  it('renders without label prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-text></cws-field-text>')
    const component = await page.find('cws-field-text')

    await page.waitForChanges()
    expect(component.getAttribute('label')).toBeNull()
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
    const component = await page.find('cws-field-text')

    await page.waitForChanges()
    expect(component.getAttribute('hint')).toBeNull()
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
    expect(component.getAttribute('error')).toBeNull()

    component.setAttribute('error', true)
    await page.waitForChanges()
    expect(component.getAttribute('error')).toBeTruthy()
  })

  it('renders default value prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-text></cws-field-text>')

    const input = await page.find('cws-field-text .cws-field-text-input')
    const inputValue = await input.getProperty('value')
    expect(inputValue).toEqual('')

    await input.press('H')
    await input.press('E')
    await input.press('L')
    await input.press('L')
    await input.press('O')
  })
})
