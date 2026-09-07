const fs = require('fs');
let file = 'src/components/ServicesSection.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  "import { Factory, Fan, Building2, Wrench } from 'lucide-react';",
  "import { Fan } from 'lucide-react';"
);

fs.writeFileSync(file, code);
