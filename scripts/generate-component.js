const fs = require('fs')
const _ = require('lodash')

const generateComponent = (name) => {
  const componentClassName = name
    .split('-')
    .map(p => _.capitalize(p))
    .join('')

  if (name.indexOf('cws-') !== 0) {
    console.error(`Is required to prefix the component with 'cws-'. Ex: 'cws-${name}'`)
    return
  }

  const jsTemplate = `
import { Component, Prop, h } from '@stencil/core'

@Component({
  tag: '${name}',
  styleUrl: '${name}.css',
})

export class ${componentClassName} {
  /**
   * The first name <-- this commentary is necessary to generate docs
   */
  @Prop() name: string

  render() {
    return <div>Hello, World! I'm {this.name}</div>
  }
}

`

  const cssTemplate = `
${name} {
  display: block
}

`

  const e2eTemplate = `
/* eslint-env jest */
import { newE2EPage } from '@stencil/core/testing'

describe('${name}', () => {
  it('renders', async () => {
    const page = await newE2EPage()

    await page.setContent('<${name}></${name}>')
    const element = await page.find('${name}')
    expect(element).toHaveClass('hydrated')
  })

  it('renders changes to the name data', async () => {
    const page = await newE2EPage()

    await page.setContent('<${name}></${name}>')
    const component = await page.find('${name}')
    const element = await page.find('${name} >>> div')
    expect(element.textContent).toEqual(\`Hello, World! I'm \`)

    component.setProperty('name', 'James')
    await page.waitForChanges()
    expect(element.textContent).toEqual(\`Hello, World! I'm James\`)
  })
})

`

  const outPath = `src/components/${name}`

  try {
    fs.mkdirSync(outPath)
  } catch (e) {
    console.error('Unable to create component')
    throw e
  }

  try {
    fs.writeFileSync(`${outPath}/${name}.tsx`, jsTemplate.trim())
    fs.writeFileSync(`${outPath}/${name}.css`, cssTemplate.trim())
    fs.writeFileSync(`${outPath}/${name}.e2e.ts`, e2eTemplate.trim())

    console.log('Component generated')
  } catch (e) {
    console.error('Unable to create source files')
    throw e
  }
}

module.exports = generateComponent
