/* eslint-env jest */
import { newE2EPage } from '@stencil/core/testing'

describe('cws-field-text', () => {
  it('renders', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-text label="Name" name="name"></cws-field-text>')
    const element = await page.find('cws-field-text')
    expect(element).toHaveClass('hydrated')
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
})
