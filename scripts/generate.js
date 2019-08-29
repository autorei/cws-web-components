const generateComponent = require('./generate-component.js')
const generateIcons = require('./generate-icons.js')

const capitalize = s => s.charAt(0).toUpperCase() + s.substr(1)

const av = process.argv

const type = av[2]
const name = av[3]

if (type === 'component') {
  generateComponent(name)
}

if (type === 'icons') {
  generateIcons()
}
