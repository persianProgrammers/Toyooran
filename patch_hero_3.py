import re

with open("src/components/Hero.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update the 4th card (other) geometric shape to be more vibrant when not hovered
content = content.replace(
'''                  case 'other': return (
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rotate-45 border-[2px] border-white/60 bg-gradient-to-br from-white/30 to-transparent group-hover:border-rose-400/80 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.3),inset_0_0_15px_rgba(255,255,255,0.2)] transition-all duration-700 group-hover:rotate-[225deg] flex items-center justify-center">
                      <div className="absolute inset-2 border-[1px] border-white/50 group-hover:border-rose-400/50 transition-colors duration-700 rounded-full" />
                      <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/60 group-hover:bg-rose-300 rounded-full transition-all duration-700 group-hover:translate-x-1 group-hover:translate-y-1" />
                      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-white/60 group-hover:bg-rose-300 rounded-full transition-all duration-700 group-hover:-translate-x-1 group-hover:-translate-y-1" />
                      <div className="w-2 h-2 bg-slate-300 group-hover:bg-rose-400 rounded-full group-hover:shadow-[0_0_10px_rgba(244,63,94,1)] transition-all duration-700 group-hover:scale-150" />
                    </div>
                  );''',
'''                  case 'other': return (
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rotate-45 border-[2px] border-rose-400/80 bg-gradient-to-br from-rose-400/50 to-rose-400/10 transform-gpu will-change-transform group-hover:border-rose-400/100 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.5),inset_0_0_15px_rgba(244,63,94,0.3)] transition-all duration-700 group-hover:rotate-[225deg] flex items-center justify-center">
                      <div className="absolute inset-2 border-[1.5px] border-rose-400/60 group-hover:border-rose-400/80 transition-all duration-700 rounded-full" />
                      <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-rose-400/80 group-hover:bg-rose-300 rounded-full transition-all duration-700 group-hover:translate-x-1 group-hover:translate-y-1" />
                      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-rose-400/80 group-hover:bg-rose-300 rounded-full transition-all duration-700 group-hover:-translate-x-1 group-hover:-translate-y-1" />
                      <div className="w-2 h-2 bg-rose-400/80 group-hover:bg-rose-300 rounded-full group-hover:shadow-[0_0_12px_rgba(244,63,94,1)] transition-all duration-700 group-hover:scale-150" />
                    </div>
                  );'''
)

# 2. Update the Huge Number Graphic to be less visible by default, then appear prominently on hover
content = content.replace(
'''        {/* Huge Number Graphic in Background */}
        <div className="absolute -top-4 -right-4 text-[120px] font-black [-webkit-text-stroke:3px_rgba(255,255,255,0.35)] group-hover:[-webkit-text-stroke:3px_rgba(251,191,36,0.7)] text-white/20 group-hover:text-amber-500/30 transition-all duration-700 pointer-events-none group-hover:scale-110 group-hover:-translate-x-4 group-hover:translate-y-4 origin-top-right">
          0{idx + 1}
        </div>''',
'''        {/* Huge Number Graphic in Background */}
        <div className="absolute -top-4 -right-4 text-[120px] font-black [-webkit-text-stroke:1.5px_rgba(255,255,255,0.1)] group-hover:[-webkit-text-stroke:3px_rgba(251,191,36,0.7)] text-transparent group-hover:text-amber-500/20 transition-all duration-700 pointer-events-none group-hover:scale-110 group-hover:-translate-x-4 group-hover:translate-y-4 origin-top-right">
          0{idx + 1}
        </div>'''
)

with open("src/components/Hero.tsx", "w", encoding="utf-8") as f:
    f.write(content)

