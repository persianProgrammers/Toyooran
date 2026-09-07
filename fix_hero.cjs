const fs = require('fs');
const file = 'src/components/Hero.tsx';
let content = fs.readFileSync(file, 'utf8');

// Find export const categoryCards and move it before export const Hero
const startIdx = content.indexOf('export const categoryCards');
if (startIdx === -1) {
    console.error("categoryCards not found");
    process.exit(1);
}

const endIdx = content.indexOf('    {', content.indexOf('id: \'cooling\',', startIdx)); // this is fragile, let's use a regex or just find the end of the array.
