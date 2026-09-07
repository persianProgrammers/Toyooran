import re

with open("src/components/Footer.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("companyInfo?.phoneNumbers?.[0] || '۰۲۱-۱۲۳۴۵۶۷۸'", "companyInfo?.phone || '09151126258'")

with open("src/components/Footer.tsx", "w", encoding="utf-8") as f:
    f.write(content)

