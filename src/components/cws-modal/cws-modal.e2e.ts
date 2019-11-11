/* eslint-env jest */
import { newE2EPage } from '@stencil/core/testing'

describe('cws-modal', () => {
  // Declarando todas as variaveis para todos os  testes
  let page
  let component
  let wrapper

  beforeEach(async () => {
    page = await newE2EPage()
    await page.setContent('<cws-modal></cws-modal>')

    component = await page.find('cws-modal')
    wrapper = await page.find('cws-modal > div')
  })

  it('renders', async () => {
    expect(component).toHaveClass('hydrated')
  })

  it('renders a div, decorated with a class, called overlay', async () => {
    wrapper = await page.find('cws-modal > div')
    expect(wrapper).toHaveClass('overlay')
  })

  describe('open', () => {
    it('should add the is-visible class to the overlay', async () => {
      component.setProperty('open', true)
      await page.waitForChanges()

      expect(wrapper).toHaveClass('is-visible')
    })

    it('should add the is-transparent class to the overlay, when the property is set', async () => {
      component.setProperty('open', true)
      component.setProperty('transparent', true)
      await page.waitForChanges()

      expect(wrapper).toHaveClasses(['is-visible', 'is-transparent'])
    })
  })

  describe('close', () => {
    it('should remove the is-visible class from the overlay', async () => {
      component.setProperty('open', true)
      await page.waitForChanges()
      expect(wrapper).toHaveClass('is-visible')

      component.setProperty('open', false)
      await page.waitForChanges()

      expect(wrapper).not.toHaveClass('is-visible')
    })
  })
})
