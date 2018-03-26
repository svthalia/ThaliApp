/* eslint-disable import/no-extraneous-dependencies */
const Parser = require('i18next-scanner').Parser;
const fs = require('fs');
const path = require('path');
const execFileSync = require('child_process').execFileSync;

function mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }

    return curDir;
  }, initDir);
}

const componentsPath = 'app/ui';
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
    loadPath: 'app/assets/locales/{{lng}}/{{ns}}.json',
    savePath: 'app/assets/locales/{{lng}}/{{ns}}.json',
  },
};

const indexFiles = {};
options.lngs.forEach((lang) => {
  indexFiles[lang] = [];
});

const components = execFileSync('find', [componentsPath]).toString('utf8')
  .split('\n')
  .filter(p => p.indexOf('/style') < 0 && p.length > 0)
  .filter(p => fs.statSync(p).isFile());

components.forEach((f) => {
  options.defaultNs = f.substr(0, 1).toLowerCase() + f.substr(1, f.length - 4);
  const parser = new Parser(options);
  const content = fs.readFileSync(path.join(f), 'utf-8');

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
          mkDirByPathSync(dir);
        }
        fs.writeFileSync(resPath, `${str}\n`);
        indexFiles[lng].push(ns);
      } else if (fs.existsSync(resPath)) {
        fs.unlinkSync(resPath);
      }
    });
  });
});

const indexStream = fs.createWriteStream('app/assets/locales/index.js');
indexStream.once('open', () => {
  indexStream.write('const files = {};\n');
  Object.keys(indexFiles).forEach((lang) => {
    const files = indexFiles[lang];
    const langName = lang.toUpperCase();
    files.forEach((fileName) => {
      indexStream.write(`files['${fileName}${langName}'] = require('./${lang}/${fileName}.json');\n`);
    });
  });
  indexStream.write('\n');
  indexStream.write('export default {\n');
  Object.keys(indexFiles).forEach((lang) => {
    indexStream.write(`  ${lang}: {\n`);
    const files = indexFiles[lang];
    const langName = lang.toUpperCase();
    files.forEach((fileName) => {
      const ns = fileName.substring(7);
      indexStream.write(`    '${ns}': files['${fileName}${langName}'],\n`);
    });
    indexStream.write('  },\n');
  });
  indexStream.write('};\n');
  indexStream.end();
});
