const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.tsx', 'utf8');
content = content.replace('export const categoryCards: CircleCategoryCard[] = [', 'const categoryCards: CircleCategoryCard[] = [');
fs.writeFileSync('src/components/Hero.tsx', content);
console.log("Fixed Hero.tsx");

// Now we need categoryCards in ServicesSection.tsx.
let servicesContent = fs.readFileSync('src/components/ServicesSection.tsx', 'utf8');

const cardsArray = `
import { Factory, Fan, Building2, Wrench } from 'lucide-react';
const categoryCards = [
    {
      id: 'heating',
      title: 'ماشین‌آلات خوراک',
      categoryEn: 'Feed Machinery',
      icon: Factory,
      desc: 'پرس پلت، اکسترودر، میکرودایزینگ و آسیاب میکسر',
      badge: 'کارخانجات خوراک',
      accentColor: '#003F86',
      badgeBg: 'bg-blue-50',
      badgeText: 'text-[#003F86]',
      specs: ['پرس پلت ۲ الی ۲۰ تن/ساعت', 'میکرودایزینگ دقیق افزودنی‌ها'],
      bgImage: '/images/service_feed_machinery.jpg'
    },
    {
      id: 'ventilation',
      title: 'تجهیزات مرغداری',
      categoryEn: 'Farm Equipment',
      icon: Fan,
      desc: 'بشقاب پروانه‌ای FDA، آبخوری نیپل و جت هیتر',
      badge: 'تاییدیه FDA آمریکا',
      accentColor: '#FF9F14',
      badgeBg: 'bg-amber-50',
      badgeText: 'text-amber-700',
      specs: ['بشقاب پروانه‌ای لیسانس آمریکا', 'جت هیتر و سیستم‌های گرمایشی'],
      bgImage: '/images/service_farm_equipment.jpg'
    },
    {
      id: 'cooling',
      title: 'سوله و سالن صنعتی',
      categoryEn: 'Turnkey Shed',
      icon: Building2,
      desc: 'طراحی، ساخت و تجهیز کامل سوله‌های پرورشی',
      badge: 'پیمانکاری Turn-key',
      accentColor: '#10B981',
      badgeBg: 'bg-emerald-50',
      badgeText: 'text-emerald-700',
      specs: ['سازه‌های مقاوم و عایق', 'اتوماسیون هوشمند یکپارچه'],
      bgImage: '/images/service_turnkey_shed.jpg'
    },
    {
      id: 'other',
      title: 'قطعات و پشتیبانی',
      categoryEn: 'Parts & Support',
      icon: Wrench,
      desc: 'تامین قطعات یدکی، گارانتی ۲۴ ماهه و تعمیرات',
      badge: 'خدمات پس از فروش',
      accentColor: '#F43F5E',
      badgeBg: 'bg-rose-50',
      badgeText: 'text-rose-700',
      specs: ['تامین فوری قطعات مصرفی', 'پشتیبانی فنی ۲۴/۷'],
      bgImage: '/images/service_supplements.jpg'
    }
  ];
`;

servicesContent = servicesContent.replace(
  "import { ServiceCard, categoryCards } from './Hero';",
  "import { ServiceCard } from './Hero';\n" + cardsArray
);

fs.writeFileSync('src/components/ServicesSection.tsx', servicesContent);
console.log("Fixed ServicesSection.tsx");
