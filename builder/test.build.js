import _path from 'path';
const index = _path.resolve(__dirname, '../', 'local.test.js');
const { main } = require('../package.json');
import fs from 'fs';

const content = 
`import DoMain from './${main.replace(eval(`/${_path.extname(main)}/g`), '')}';

DoMain.help();
`;


fs.writeFileSync(index, content.replace(/\\/g, '/'));