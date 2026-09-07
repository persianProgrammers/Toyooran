import re

with open("src/data/mockData.ts", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("phone: '۰۵۱-۳۶۶۶۵۶۰۰',", "phone: '09151126258',")

with open("src/data/mockData.ts", "w", encoding="utf-8") as f:
    f.write(content)

