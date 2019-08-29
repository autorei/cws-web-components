const fs = require('fs')

// remove style and breaklines
const formatSvg = (rawSvg) => {
  return rawSvg
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\sstyle=\"[^\s]*\"\s/g, ' ')
    .replace(/\sfill=\"[^\s]*\"\s/g, ' ')
    .replace(/\>\s+\</g,'><')
}

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
        iconsExportContent + `\n  '${iconName}': '${formatSvg(fileContent)}',`
    }

    if (index + 1 === svgFiles.length) {
      const jsIconsContent = `/* This file is generated automatically by command: \`npm run generate icons\` */\n\nexport default {${iconsExportContent}\n}`

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
