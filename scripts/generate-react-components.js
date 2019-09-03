const fs = require('fs')
const _ = require('lodash')

const parserContent = `
import React from 'react'

const listeners = Symbol('jsx-web-comp/event-listeners')
const eventPattern = /^on[A-Z]{1}/
const toKebabCase = (str) => str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()

export default function jsx(type, props, ...children) {
  const isCustomElement = customElements.get(type)
  const newProps = Object.assign({}, props)
  if (typeof type === 'string' && isCustomElement) {
    newProps.ref = (element) => {
      if (element) {
        if (props) {
          /** Map custom events as objects (must have onEvent prefix) */
          const events = Object
            .entries(props)
            .filter(([k, v]) => k.match(eventPattern))
            .map(([k, v]) => ({ [k]: v }))

          /** Get only the complex props (objects and arrays) */
          const complexProps = Object
            .entries(props)
            .filter(([k, v]) => typeof v === 'object')
            .map(([k, v]) => ({ [k]: v }))

          for (const event of events) {
            const [key, impl] = Object.entries(event)[0]
            const eventName = toKebabCase(key).replace('-', '')

            /** Add the listeners Map if not present */
            if (!element[listeners]) {
              element[listeners] = new Map()
            }

            /** If the listener hasn't be attached, attach it */
            if (!element[listeners].has(eventName)) {
              element.addEventListener(eventName, impl)
              /** Save a reference to avoid listening to the same value twice */
              element[listeners].set(eventName, impl)
              delete newProps[key]
            }
          }

          for (const prop of complexProps) {
            const [key, value] = Object.entries(prop)[0]
            delete newProps[key] // remove the complex prop from props
            element[key] = value
          }
        }
      }
    }
  }

  return React.createElement.apply(null, [type, newProps, ...children])
}

`

const webComponentsToReact = async () => {
  const componentsFolder = 'src/components'
  const components = await fs.readdirSync(componentsFolder)
  let indexExportContent = ''


  for (let index = 0; index < components.length; index++) {
    const fileName = components[index]
    const componentName = _.startCase(fileName).replace(/\s/g, '')

    indexExportContent = indexExportContent + `\nexport const ${componentName} = (props) => webComponentsToReact('${fileName}', props)`
  }

  const indexContent = `
  import webComponentsToReact from './web-components-to-react'
import { applyPolyfills, defineCustomElements } from '../loader'

applyPolyfills().then(() => {
  defineCustomElements(window);
})

${indexExportContent}
  `

  try {
    if (!fs.existsSync('react')) {
      fs.mkdirSync('react');
    }

    fs.writeFileSync('react/index.js', indexContent.trim())
    fs.writeFileSync('react/web-components-to-react.js', parserContent.trim())

    console.log('React Components generated')
  } catch (e) {
    console.error('Unable to generate React Components file')
    throw e
  }
}

webComponentsToReact()
