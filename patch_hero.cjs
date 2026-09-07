const fs = require('fs');
const file = 'src/components/Hero.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "interface CircleCategoryCard {",
  "export interface CircleCategoryCard {"
);

content = content.replace(
  "const ServiceCard: React.FC<{ card: any, idx: number, onClick: () => void }> =",
  "export const ServiceCard: React.FC<{ card: any, idx: number, onClick: () => void }> ="
);

content = content.replace(
  "const categoryCards: CircleCategoryCard[] = [",
  "export const categoryCards: CircleCategoryCard[] = ["
);

fs.writeFileSync(file, content);
console.log("Patched Hero.tsx");
