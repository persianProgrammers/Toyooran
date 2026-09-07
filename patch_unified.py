import re

with open("src/components/AboutContactUnifiedSection.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("phones[0] || '۰۲۱-۱۲۳۴۵۶۷۸'", "phones[0] || '09151126258'")
content = content.replace("phones = companyInfo?.phoneNumbers || []", "phones = [companyInfo?.phone].filter(Boolean)")

with open("src/components/AboutContactUnifiedSection.tsx", "w", encoding="utf-8") as f:
    f.write(content)

