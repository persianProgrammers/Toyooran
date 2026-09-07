const fs = require('fs');
const file = 'src/components/FeaturedProjectsSection.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add import
content = content.replace(
  "import { InnerScrollIndicator } from './InnerScrollIndicator';",
  "import { InnerScrollIndicator } from './InnerScrollIndicator';\nimport { UnderConstruction } from './UnderConstruction';"
);

// Replace everything after <InnerScrollIndicator />
const matchStr = "        <InnerScrollIndicator />\n      </div>";
const splitIndex = content.indexOf(matchStr);

if (splitIndex !== -1) {
  const newContent = content.substring(0, splitIndex + matchStr.length) + `

      <div className="w-full relative z-10 -mt-16">
        <UnderConstruction 
          title="بخش پروژه‌ها در حال بروزرسانی است" 
          description="ما در حال تهیه مستندات کامل، گالری تصاویر و تحلیل‌های تخصصی از بزرگترین پروژه‌های اجرا شده در سراسر کشور هستیم. این بخش به زودی تکمیل خواهد شد."
        />
      </div>
    </section>
  );
};
`;
  fs.writeFileSync(file, newContent);
  console.log("Successfully patched FeaturedProjectsSection.tsx");
} else {
  console.log("Could not find split string.");
}
