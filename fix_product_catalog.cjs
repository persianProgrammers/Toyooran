const fs = require('fs');

let file = 'src/components/ProductCatalogSection.tsx';
let code = fs.readFileSync(file, 'utf8');

// Regular expression to match the isIndustrialMachine block
const regex = /\{\s*product\.isIndustrialMachine\s*&&\s*\([\s\S]*?صنعتی[\s\S]*?<\/div>\s*\)\s*\}/g;

code = code.replace(regex, '');

fs.writeFileSync(file, code);
