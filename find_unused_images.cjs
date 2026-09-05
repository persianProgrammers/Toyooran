const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getFiles(dir, matchFiles) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('dist')) {
        results = results.concat(getFiles(file, matchFiles));
      }
    } else {
      if (matchFiles(file)) {
        results.push(file);
      }
    }
  });
  return results;
}

const imageFiles = getFiles('.', file => /\.(jpg|jpeg|png|svg|webp|gif)$/i.test(file) && !file.includes('node_modules') && !file.includes('dist') && !file.includes('.git'));
const sourceFiles = getFiles('.', file => /\.(ts|tsx|js|jsx|json|css|html|md)$/i.test(file) && !file.includes('node_modules') && !file.includes('dist') && !file.includes('.git'));

const unusedImages = [];

imageFiles.forEach(img => {
  const filename = path.basename(img);
  // Keep logos
  if (filename.toLowerCase().includes('logo')) {
    return;
  }
  
  let isUsed = false;
  for (const src of sourceFiles) {
    const content = fs.readFileSync(src, 'utf8');
    if (content.includes(filename)) {
      isUsed = true;
      break;
    }
  }
  
  if (!isUsed) {
    unusedImages.push(img);
  }
});

console.log("Unused images:");
unusedImages.forEach(img => console.log(img));
