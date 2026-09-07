const fs = require('fs');

let data = fs.readFileSync('src/data/productsData.ts', 'utf8');

// The objects are in an array. We can parse it if it's clean, or just use regex on the raw string.
// Let's use regex to find each block. We can do it by replacing it block by block.

// A regex that matches the product block from "code": "KT-XXX", up to "gallery": [ ... ]
// Actually, it's easier to split by '"code": ' and reconstruct.

let parts = data.split('"code": "');

// First part has the header
let result = parts[0];

for (let i = 1; i < parts.length; i++) {
  let part = parts[i];
  
  // extract code, e.g., "KT-001"
  let codeMatch = part.match(/^([a-zA-Z0-9\-]+)"/);
  if (codeMatch) {
    let code = codeMatch[1]; // e.g. KT-001
    // The image name should be TS-001 for KT-001.
    // If code is like XX-123, we extract the number part.
    let numPart = code.split('-')[1]; // 001
    let tsCode = `TS-${numPart}`; // TS-001
    
    // Replace the placeholder with the new image path
    part = part.replace(/"image": "\/images\/product-placeholder\.svg"/g, `"image": "/images/products/${tsCode}.webp"`);
    part = part.replace(/"\/images\/product-placeholder\.svg"/g, `"/images/products/${tsCode}.webp"`);
  }
  
  result += '"code": "' + part;
}

fs.writeFileSync('src/data/productsData.ts', result);
console.log("Images replaced");
