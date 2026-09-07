const fs = require('fs');
const file = 'src/components/ServicesSection.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add imports for ServiceCard and categoryCards
content = content.replace(
  "import { SERVICES } from '../data/mockData';",
  "import { SERVICES } from '../data/mockData';\nimport { ServiceCard, categoryCards } from './Hero';\nimport { useNavigate } from 'react-router-dom';"
);

// We need to replace the grid part.
const startIdx = content.indexOf('<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">');
const endIdx = content.indexOf('</section>');

const newGrid = `
        {/* 🎨 Dribbble-Worthy High-Fidelity Magic Cards */}
        <div className="relative z-10 w-full py-8 lg:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 w-full">
            {categoryCards.map((card, idx) => (
              <ServiceCard key={idx} idx={idx} card={card} onClick={() => {}} />
            ))}
          </div>
        </div>
      </div>
    `;

content = content.substring(0, startIdx) + newGrid + content.substring(endIdx);

fs.writeFileSync(file, content);
console.log("Rewrote ServicesSection.tsx");
