/*
 * based on https://gist.github.com/elebetsamer/35aabac4e9e3df7e102574e4192680f1
 */

const fs = require('fs');

const capitalize = s => s.charAt(0).toUpperCase() + s.substr(1);

const av = process.argv;

const type = av[2];
const prefix = av[4] || '';
const name = `${prefix}${av[3]}`;

const componentClassName = name.replace(prefix, '').split('-').map(p => capitalize(p)).join('');

const jsTemplate = `
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: '${name}',
  styleUrl: '${name}.css',
})

export class ${componentClassName} {
  /**
   * The first name
   */
  @Prop() name: string;

  render() {
    return <div>Hello, World! I'm {this.name}</div>;
  }
}

`

const cssTemplate = `
${name} {
  display: block;
}

`

const e2eTemplate = `
import { newE2EPage } from '@stencil/core/testing';

describe('${name}', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<${name}></${name}>');
    const element = await page.find('${name}');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<${name}></${name}>');
    const component = await page.find('${name}');
    const element = await page.find('${name} >>> div');
    expect(element.textContent).toEqual(\`Hello, World! I'm \`);

    component.setProperty('name', 'James');
    await page.waitForChanges();
    expect(element.textContent).toEqual(\`Hello, World! I'm James\`);
  });
});

`

const outPath = `src/components/${name}`;

try {
  fs.mkdirSync(outPath);
} catch (e) {
  console.error('Unable to create component')
  throw e;
}

try {
  fs.writeFileSync(`${outPath}/${name}.tsx`, jsTemplate.trim());
  fs.writeFileSync(`${outPath}/${name}.css`, cssTemplate.trim());
  fs.writeFileSync(`${outPath}/${name}.e2e.ts`, e2eTemplate.trim());

  console.error('Component generated');
} catch (e) {
  console.error('Unable to create source files');
  throw e;
}
