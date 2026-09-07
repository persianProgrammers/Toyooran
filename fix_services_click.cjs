const fs = require('fs');

let appContent = fs.readFileSync('src/App.tsx', 'utf8');
appContent = appContent.replace(
  '<ServicesSection\n                services={services}\n                onSelectService={setSelectedService}\n                onOpenConsultation={() => handleOpenUnifiedConsultation(\'سوله و سالن صنعتی\')}\n              />',
  '<ServicesSection\n                services={services}\n                onSelectService={setSelectedService}\n                onSelectCategory={handleSelectCategory}\n                onOpenConsultation={() => handleOpenUnifiedConsultation(\'سوله و سالن صنعتی\')}\n              />'
);
fs.writeFileSync('src/App.tsx', appContent);
console.log('App.tsx updated');

let secContent = fs.readFileSync('src/components/ServicesSection.tsx', 'utf8');
secContent = secContent.replace(
  'interface ServicesSectionProps {\n  services?: Service[];\n  onSelectService: (service: Service) => void;\n  onOpenConsultation: () => void;\n}',
  'interface ServicesSectionProps {\n  services?: Service[];\n  onSelectService: (service: Service) => void;\n  onSelectCategory?: (categoryId: any) => void;\n  onOpenConsultation: () => void;\n}'
);

secContent = secContent.replace(
  'export const ServicesSection: React.FC<ServicesSectionProps> = ({\n  services = SERVICES,\n  onSelectService,\n  onOpenConsultation,\n}) => {',
  'export const ServicesSection: React.FC<ServicesSectionProps> = ({\n  services = SERVICES,\n  onSelectService,\n  onSelectCategory,\n  onOpenConsultation,\n}) => {'
);

secContent = secContent.replace(
  'onClick={() => {}}',
  'onClick={() => onSelectCategory && onSelectCategory(card.id)}'
);

fs.writeFileSync('src/components/ServicesSection.tsx', secContent);
console.log('ServicesSection.tsx updated');
