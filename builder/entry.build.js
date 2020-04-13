import Handlebars from 'handlebars';
import _path from 'path';
import fs from 'fs';
const domain = require('../package.json');
const index = _path.resolve(__dirname, '../', domain.entry);
const _join = _path.join;

/*************************工具集*************************/
/**
 * @param startPath  起始目录文件夹路径
 * @param relative 相对的路径
 * @returns {Array}
 */
function findSync(startPath, relative) {
    let result = [];
    function finder(path) {
        const files = fs.readdirSync(path);
        files.forEach((val) => {
            let fPath = _join(path, val);
            let stats = fs.statSync(fPath);
            if(stats.isDirectory()) finder(fPath);
            if(stats.isFile()) result.push(fPath);
        });
    }
    finder(startPath);
    if (relative) result = result.map(row => _path.relative(relative, row))
    return result;
}

// 特殊字符传驼峰
function toHump(name) {
    return name.replace(/[~!@#$%^&*()/\|,.<>?"'();:_+-=\[\]{}](\w)/g, function(_all, letter){
        return letter.toUpperCase();
    });
}

// 驼峰转换特殊字符（默认：下划线）
function toLine(name, def = '_') {
  return name.replace(/([A-Z])/g, `${def}$1`).toLowerCase();
}

// 首字母大写
function firstToUpCase(str) {
    str = str ? str : '';
    return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

// 去读构建入口文件忽略文件
// 可优化
function readEntryIgnore() {
    const context = fs.readFileSync(_path.resolve(__dirname, './', '.entryignore'), 'utf-8');
    return context.split('\r\n');
}
/*************************工具集*************************/

const content = 
`{{ imports }}
export default {
    version: '${domain.version}',
	help: () => console.log(\`
包含方法（详情请看doc）：
    {{ exports }}
    \`),
    {{ exports }}
}

export {
    {{ exports }}
}

`
const rowImport = 
`import {{filename}} from '{{filepath}}';
`

const coreIgnore = readEntryIgnore();

function getContent() {
    const template = Handlebars.compile(content, { noEscape: true });
    const importTemp = Handlebars.compile(rowImport, { noEscape: true });
    // 😀 想要修改检查包，修改此处地址
    const core = _path.resolve(__dirname, '../', 'src', 'core');
    const importsStr = findSync(core, _path.resolve(index, '../'))
        .filter(row => !coreIgnore.includes(_path.basename(row)))
        .map(row => row.substring(0, row.lastIndexOf(_path.extname(row))))
    
    let imports = '';
    const exports = [];
    importsStr.forEach(filepath => {
            const filename = firstToUpCase(toHump(_path.basename(filepath)));
            exports.push(filename);
            imports += importTemp({ filename, filepath: './' + filepath });
        })
    return template({ imports, exports: exports.join(', ') })
}

fs.writeFileSync(index, getContent().replace(/\\/g, '/'));
