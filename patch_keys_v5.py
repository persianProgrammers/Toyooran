import re

with open("src/context/DataContext.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("COMPANY_INFO: 'toyooran_company_v4'", "COMPANY_INFO: 'toyooran_company_v5'")

with open("src/context/DataContext.tsx", "w", encoding="utf-8") as f:
    f.write(content)

