/* eslint-env jest */
import { newE2EPage } from '@stencil/core/testing'

describe('cws-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-icon icon="cart"></cws-icon>')
    const element = await page.find('cws-icon')
    expect(element).toHaveClass('hydrated')
  })

  it('renders and check svg', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-icon icon="cart"></cws-icon>')
    const element = await page.find('cws-icon svg')
    expect(element).not.toBeNull()
  })

  it('renders changes to the icon size', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-icon size="xl" icon="cart"></cws-icon>')
    const component = await page.find('cws-icon')
    const element = await page.find('cws-icon > div')
    expect(element.getAttribute('class')).toContain('cws-icon--xl')

    component.setProperty('size', 'sm')
    await page.waitForChanges()
    expect(element.getAttribute('class')).toContain('cws-icon--sm')
  })

  it('renders changes to the rendered icon', async () => {
    const page = await newE2EPage()

    await page.setContent('<cws-icon icon="cart"></cws-icon>')
    const component = await page.find('cws-icon')
    const element = await page.find('cws-icon > div')
    expect(element.getAttribute('class')).toContain('cws-icon--cart')

    component.setProperty('icon', 'account')
    await page.waitForChanges()
    expect(element.getAttribute('class')).toContain('cws-icon--account')
  })

  it('renders custom svg icon', async () => {
    const page = await newE2EPage()

    await page.setContent(
      '<cws-icon size="xl"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 261.03 260.47"><title>C - cws.digital</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M130.49.25C164,.25,197.48.69,231,.06,247.22-.25,261,13,261,30.52Q261,115.74,261,201c0,9.67,0,19.33,0,29a30.09,30.09,0,0,1-30.6,30.48q-100.21-.81-200.43,0c-16,.14-30.13-14.06-30-29.8Q.9,130.21,0,29.74C-.13,13.62,14.39-.34,29.53,0,63.17.78,96.84.25,130.49.25ZM197.7,60.47c-1.87-.13-2.86-.26-3.84-.26-43.16,0-86.32,0-129.47-.09-4.36,0-5.26,1.63-5.25,5.58q.16,63.24,0,126.47c0,5.06,1.41,6.53,6.48,6.5,37.49-.2,75-.11,112.47-.11,5.17,0,10.34.18,15.49-.14,1.38-.09,3.76-1.7,3.8-2.69.33-7.42.18-14.86.18-22.81h-7q-49.23,0-98.47,0c-6.7,0-6.82-.18-6.82-6.61,0-24.66.12-49.32-.11-74,0-4.79,1.28-6.21,6.13-6.18,33.33.2,66.66.1,100,.1,1.33,0,2.78.3,4-.11,1-.35,2.36-1.52,2.38-2.36C197.78,76.14,197.7,68.51,197.7,60.47Z"/></g></g></svg></cws-icon>',
    )
    const divElement = await page.find('cws-icon > div')
    const svgElement = await page.find('cws-icon svg')
    expect(divElement.getAttribute('class')).toContain('cws-icon--custom')
    expect(svgElement).not.toBeNull()
  })
})
