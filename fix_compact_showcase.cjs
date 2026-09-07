const fs = require('fs');

let file = 'src/components/CompactShowcase.tsx';
let code = fs.readFileSync(file, 'utf8');

// add import
code = code.replace(
  "import { Article } from '../types';",
  "import { Article } from '../types';\nimport { LazyImage } from './LazyImage';"
);

code = code.replace(
  '<img src={product.image} alt={product.name} className="w-[80%] h-[80%] object-contain group-hover:scale-110 transition-transform duration-500 relative z-0" loading="lazy" />',
  '<LazyImage src={product.image} alt={product.name} className="w-full h-full absolute inset-0 flex items-center justify-center bg-transparent" imgClassName="w-[80%] h-[80%] object-contain group-hover:scale-110 transition-transform duration-500 relative z-0" />'
);

code = code.replace(
  '<img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />',
  '<LazyImage src={article.image} alt={article.title} className="w-full h-full" imgClassName="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />'
);

fs.writeFileSync(file, code);
