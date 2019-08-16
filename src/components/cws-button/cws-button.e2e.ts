/* eslint-env jest */

import { newE2EPage } from '@stencil/core/testing'

describe('cws-button', () => {
  it('renders', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-button type="button">Click me</cws-button>')
    const element = await page.find('cws-button')
    expect(element).toHaveClass('hydrated')
  })

  it('renders changes to the variant prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-button type="button">Click me</cws-button>')
    const component = await page.find('cws-button')
    const element = await page.find('cws-button > button')
    expect(element.textContent).toEqual('Click me')
    expect(element).toHaveClass('cws-button--primary')

    component.setProperty('variant', 'secondary')
    await page.waitForChanges()
    expect(element).toHaveClass('cws-button--secondary')
  })

  it('renders an anchor with internal href', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-button href="/product/123">View product</cws-button>')
    const element = await page.find('cws-button > a')
    expect(element.textContent).toEqual('View product')
    expect(element.getAttribute('href')).toContain('/product/123')
    expect(element.getAttribute('target')).toEqual(null)
    expect(element.getAttribute('rel')).toEqual(null)
  })

  it('renders an anchor with external href', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-button href="https://google.com">Go google</cws-button>')
    const element = await page.find('cws-button > a')
    expect(element.textContent).toEqual('Go google')
    expect(element.getAttribute('href')).toEqual('https://google.com')
    expect(element.getAttribute('target')).toEqual('_blank')
    expect(element.getAttribute('rel')).toEqual('nofollow')
  })
})
