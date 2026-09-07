import re

with open("src/components/Hero.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Background Image opacity & gradient
content = content.replace('opacity-40 group-hover:opacity-70 transition-opacity', 'opacity-60 group-hover:opacity-85 transition-opacity')
content = content.replace('from-[#001c3d]/40 via-[#001c3d]/70 to-[#001c3d]', 'from-[#001c3d]/30 via-[#001c3d]/60 to-[#001c3d]/90')

# 2. Huge Number Graphic
content = content.replace('[-webkit-text-stroke:2px_rgba(255,255,255,0.2)] group-hover:[-webkit-text-stroke:2px_rgba(251,191,36,0.5)] text-white/10 group-hover:text-amber-500/20',
                          '[-webkit-text-stroke:3px_rgba(255,255,255,0.35)] group-hover:[-webkit-text-stroke:3px_rgba(251,191,36,0.7)] text-white/20 group-hover:text-amber-500/30')

# 3. Top Badge
content = content.replace('bg-white/5 border border-white/30 text-[10px] sm:text-xs font-bold text-slate-300 group-hover:border-amber-400/40 group-hover:text-amber-300 group-hover:bg-amber-400/10 transition-all duration-500  transform-gpu will-change-transform shadow-lg',
                          'bg-white/10 border border-white/50 text-[10px] sm:text-xs font-bold text-white group-hover:border-amber-400/60 group-hover:text-amber-300 group-hover:bg-amber-400/20 transition-all duration-500 transform-gpu will-change-transform shadow-[0_4px_15px_rgba(0,0,0,0.3)]')

with open("src/components/Hero.tsx", "w", encoding="utf-8") as f:
    f.write(content)

