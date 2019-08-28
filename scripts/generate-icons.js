const fs = require('fs')

const generateIcons = async () => {
  const iconsFolder = 'src/components/cws-icon/icons'
  const svgFiles = await fs.readdirSync(iconsFolder)
  let iconsExportContent = ''

  for (let index = 0; index < svgFiles.length; index++) {
    const fileName = svgFiles[index]

    if (fileName.indexOf('.svg') !== -1) {
      const fileContent = await fs.readFileSync(`${iconsFolder}/${fileName}`, 'utf-8')
      const iconName = fileName.replace('.svg', '')
      iconsExportContent =
        iconsExportContent + `\n  '${iconName}': '${fileContent.replace(/(\r\n|\n|\r)/gm, '')}',`
    }

    if (index + 1 === svgFiles.length) {
      const jsIconsContent = `export default {${iconsExportContent}\n}`

      try {
        fs.writeFileSync(`${iconsFolder}/index.ts`, jsIconsContent.trim())

        console.log('icons generated')
      } catch (e) {
        console.error('Unable to create icons file')
        throw e
      }
    }
  }
}

module.exports = generateIcons
