import re

for filename in ["src/components/AboutContactUnifiedSection.tsx", "src/components/ContactPage.tsx"]:
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()

    # Make iframe more visible
    content = content.replace(
        'className="w-full h-full grayscale opacity-30 group-hover:opacity-60 transition-all duration-700 object-cover"',
        'className="w-full h-full grayscale-[50%] opacity-60 group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-700 object-cover"'
    )
    
    # Make overlay lighter
    content = content.replace(
        '<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10 pointer-events-none" />',
        '<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10 pointer-events-none" />'
    )

    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

