import _path from 'path';
const index = _path.resolve(__dirname, '../', 'local.test.js');
const domain = require('../package.json');
import fs from 'fs';

const content = 
`import DoMain from './${_path.basename(domain.main, _path.extname(domain.main))}';

DoMain.help();
`;

fs.writeFileSync(index, content.replace(/\\/g, '/'));