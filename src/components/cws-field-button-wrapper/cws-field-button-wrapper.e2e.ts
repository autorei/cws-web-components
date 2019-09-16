/* eslint-env jest */
import { newE2EPage } from '@stencil/core/testing'

describe('cws-field-button-wrapper', () => {
  it('renders', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-button-wrapper></cws-field-button-wrapper>')
    const element = await page.find('cws-field-button-wrapper')
    expect(element).toHaveClass('hydrated')
  })

  it('renders with inline prop', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-field-button-wrapper inline></cws-field-button-wrapper>')
    const element = await page.find('cws-field-button-wrapper')
    expect(element).toHaveAttribute('inline')
  })
})
