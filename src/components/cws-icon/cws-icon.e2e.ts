/* eslint-env jest */
import { newE2EPage } from '@stencil/core/testing'

describe('cws-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-icon></cws-icon>')
    const element = await page.find('cws-icon')
    expect(element).toHaveClass('hydrated')
  })

  it('renders changes to the name data', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-icon></cws-icon>')
    const component = await page.find('cws-icon')
    const element = await page.find('cws-icon >>> div')
    expect(element.textContent).toEqual(`Hello, World! I'm `)

    component.setProperty('name', 'James')
    await page.waitForChanges()
    expect(element.textContent).toEqual(`Hello, World! I'm James`)
  })
})
