import re

with open("src/components/AboutContactUnifiedSection.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("const phones = companyInfo.phoneNumbers?.filter(p => p.trim() !== '') || [];", "const phones = [companyInfo.phone].filter(Boolean) || [];")

with open("src/components/AboutContactUnifiedSection.tsx", "w", encoding="utf-8") as f:
    f.write(content)

