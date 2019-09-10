/* eslint-env jest */
import { newE2EPage } from '@stencil/core/testing'

describe('cws-field-button', () => {
  it('renders', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-button></cws-field-button>')
    const element = await page.find('cws-field-button')
    expect(element).toHaveClass('hydrated')
  })

  it('renders changes to the name data', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-button></cws-field-button>')
    const component = await page.find('cws-field-button')
    const element = await page.find('cws-field-button >>> div')
    expect(element.textContent).toEqual(`Hello, World! I'm `)

    component.setProperty('name', 'James')
    await page.waitForChanges()
    expect(element.textContent).toEqual(`Hello, World! I'm James`)
  })
})
