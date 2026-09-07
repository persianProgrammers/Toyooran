import re

with open("src/context/DataContext.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Force reloading the defaults if local storage has an old version of the company info that doesn't have locations
content = content.replace(
    "const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(COMPANY_INFO as CompanyInfo);",
    "const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => { const saved = localStorage.getItem(STORAGE_KEYS.COMPANY_INFO); if (saved) { const parsed = JSON.parse(saved); if (!parsed.locations || parsed.locations.length === 0) return COMPANY_INFO as CompanyInfo; return parsed; } return COMPANY_INFO as CompanyInfo; });"
)

with open("src/context/DataContext.tsx", "w", encoding="utf-8") as f:
    f.write(content)

