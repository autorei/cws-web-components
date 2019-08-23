/* eslint-env jest */
import { newE2EPage } from '@stencil/core/testing'

describe('cws-field-text', () => {
  it('renders', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-text></cws-field-text>')
    const element = await page.find('cws-field-text')
    expect(element).toHaveClass('hydrated')
  })

  it('renders changes to the name data', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-text></cws-field-text>')
    const component = await page.find('cws-field-text')
    const element = await page.find('cws-field-text >>> div')
    expect(element.textContent).toEqual(`Hello, World! I'm `)

    component.setProperty('name', 'James')
    await page.waitForChanges()
    expect(element.textContent).toEqual(`Hello, World! I'm James`)
  })
})
