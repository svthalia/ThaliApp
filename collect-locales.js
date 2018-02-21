/* eslint-disable import/no-extraneous-dependencies */
const Parser = require('i18next-scanner').Parser;
const fs = require('fs');
const path = require('path');

const componentsPath = 'app/components';
const options = {
  nsSeparator: false,
  keySeparator: false,
  sort: true,
  lngs: ['nl'],
  func: {
    list: ['t'],
  },
  defaultNs: 'test',
  removeUnusedKeys: true,
  resource: {
    loadPath: 'app/locales/{{lng}}/{{ns}}.json',
    savePath: 'app/locales/{{lng}}/{{ns}}.json',
  },
};

const indexFiles = {};
options.lngs.forEach((lang) => {
  indexFiles[lang] = [];
});

const components = fs.readdirSync(componentsPath).filter(f =>
  fs.statSync(path.join(componentsPath, f)).isFile());

components.forEach((f) => {
  options.defaultNs = f.substr(0, 1).toLowerCase() + f.substr(1, f.length - 4);
  const parser = new Parser(options);
  const content = fs.readFileSync(path.join(componentsPath, f), 'utf-8');

  parser.parseFuncFromString(content);
  parser.parseTransFromString(content);

  const resStore = parser.get();
  Object.keys(resStore).forEach((lng) => {
    const namespaces = resStore[lng];
    Object.keys(namespaces).forEach((ns) => {
      const obj = namespaces[ns];
      const resPath = parser.formatResourceSavePath(lng, ns);
      if (Object.keys(obj).length > 0) {
        const str = JSON.stringify(obj, null, 2);
        const dir = path.dirname(resPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        fs.writeFileSync(resPath, `${str}\n`);
        indexFiles[lng].push(ns);
      } else if (fs.existsSync(resPath)) {
        fs.unlinkSync(resPath);
      }
    });
  });
});

const indexStream = fs.createWriteStream('app/locales/index.js');
indexStream.once('open', () => {
  Object.keys(indexFiles).forEach((lang) => {
    const files = indexFiles[lang];
    const langName = lang.toUpperCase();
    files.forEach((fileName) => {
      indexStream.write(`const ${fileName}${langName} = require('./${lang}/${fileName}.json');\n`);
    });
  });
  indexStream.write('\n');
  indexStream.write('export default {\n');
  Object.keys(indexFiles).forEach((lang) => {
    indexStream.write(`  ${lang}: {\n`);
    const files = indexFiles[lang];
    const langName = lang.toUpperCase();
    files.forEach((fileName) => {
      indexStream.write(`    ${fileName}: ${fileName}${langName},\n`);
    });
    indexStream.write('  },\n');
  });
  indexStream.write('};\n');
  indexStream.end();
});
