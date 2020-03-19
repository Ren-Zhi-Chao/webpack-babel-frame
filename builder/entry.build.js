import Handlebars from 'handlebars';
import _path from 'path';
import fs from 'fs';
import FileUtils from '../src/utils/file.util';
import StringUtils from '../src/utils/string.util'
const domain = require('../package.json');
const index = _path.resolve(__dirname, '../', domain.entry);

const content = 
`{{ imports }}
export default {
    version: '${domain.version}'
}

export {
    {{ exports }}
}

`
const rowImport = 
`import {{filename}} from '{{filepath}}';
`

function getContent() {
    const template = Handlebars.compile(content, { noEscape: true });
    const importTemp = Handlebars.compile(rowImport, { noEscape: true });
    const core = _path.resolve(__dirname, '../', 'src', 'core');
    const importsStr = FileUtils.findSync(core, _path.resolve(index, '../')).map(row => row.replace(/.js/g, ''));
    
    let imports = '';
    const exports = [];
    importsStr.forEach(filepath => {
        const filename = StringUtils.firstToUpCase(StringUtils.toHump(_path.basename(filepath)));
        exports.push(filename);
        imports += importTemp({ filename, filepath: './' + filepath });
    })
    return template({ imports, exports })
}

fs.writeFileSync(index, getContent().replace(/\\/g, '/'));