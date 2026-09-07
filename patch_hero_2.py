import re

with open("src/components/Hero.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 4. Tech Radar Rings
content = content.replace(
"""                    <div className={`absolute inset-0 rounded-full border-[2px] border-dashed border-white/50 ${ring1} group-hover:animate-spin [animation-duration:8s] transition-all duration-500`} />
                    <div className={`absolute inset-3 rounded-full border-[1.5px] border-white/40 ${ring2} animate-spin [animation-duration:12s] transition-all duration-500`} style={{ animationDirection: 'reverse' }} />""",
"""                    <div className={`absolute inset-0 rounded-full border-[2.5px] border-dashed border-white/60 ${ring1} group-hover:animate-spin [animation-duration:8s] transition-all duration-500`} />
                    <div className={`absolute inset-3 rounded-full border-[2px] border-white/50 ${ring2} animate-spin [animation-duration:12s] transition-all duration-500`} style={{ animationDirection: 'reverse' }} />"""
)

# 5. Abstract Glass Prism
content = content.replace(
'''                  case 'heating': return (
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rotate-45 border-[1px] border-blue-400/60 bg-gradient-to-br from-blue-400/30 to-transparent  transform-gpu will-change-transform group-hover:border-blue-400/100 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4),inset_0_0_15px_rgba(59,130,246,0.2)] transition-all duration-700 group-hover:rotate-[135deg] flex items-center justify-center">
                      <div className="absolute inset-2 border-[1px] border-blue-400/40 group-hover:border-blue-400/60 transition-all duration-700 group-hover:-rotate-90" />
                      <div className="w-2.5 h-2.5 bg-blue-400/60 group-hover:bg-blue-300 rounded-sm group-hover:shadow-[0_0_12px_rgba(59,130,246,1)] transition-all duration-700" />
                    </div>
                  );''',
'''                  case 'heating': return (
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rotate-45 border-[2px] border-blue-400/80 bg-gradient-to-br from-blue-400/50 to-blue-400/10 transform-gpu will-change-transform group-hover:border-blue-400/100 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5),inset_0_0_15px_rgba(59,130,246,0.3)] transition-all duration-700 group-hover:rotate-[135deg] flex items-center justify-center">
                      <div className="absolute inset-2 border-[1.5px] border-blue-400/60 group-hover:border-blue-400/80 transition-all duration-700 group-hover:-rotate-90" />
                      <div className="w-3 h-3 bg-blue-400/80 group-hover:bg-blue-300 rounded-sm group-hover:shadow-[0_0_12px_rgba(59,130,246,1)] transition-all duration-700" />
                    </div>
                  );'''
)

content = content.replace(
'''                  case 'ventilation': return (
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-[1px] border-amber-400/60 bg-gradient-to-br from-amber-400/30 to-transparent  transform-gpu will-change-transform group-hover:border-amber-400/100 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.4),inset_0_0_15px_rgba(251,191,36,0.2)] transition-all duration-700 group-hover:rotate-[180deg] flex items-center justify-center">
                      <div className="absolute inset-2.5 rounded-full border-[2px] border-dashed border-amber-400/60 group-hover:border-amber-400/70 transition-all duration-700 group-hover:animate-spin" style={{ animationDuration: '3s' }} />
                      <div className="w-3 h-3 bg-amber-400/60 group-hover:bg-amber-300 rounded-full group-hover:shadow-[0_0_12px_rgba(251,191,36,1)] transition-all duration-700" />
                    </div>
                  );''',
'''                  case 'ventilation': return (
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-[2px] border-amber-400/80 bg-gradient-to-br from-amber-400/50 to-amber-400/10 transform-gpu will-change-transform group-hover:border-amber-400/100 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.5),inset_0_0_15px_rgba(251,191,36,0.3)] transition-all duration-700 group-hover:rotate-[180deg] flex items-center justify-center">
                      <div className="absolute inset-2.5 rounded-full border-[2px] border-dashed border-amber-400/80 group-hover:border-amber-400/90 transition-all duration-700 group-hover:animate-spin" style={{ animationDuration: '3s' }} />
                      <div className="w-3.5 h-3.5 bg-amber-400/80 group-hover:bg-amber-300 rounded-full group-hover:shadow-[0_0_12px_rgba(251,191,36,1)] transition-all duration-700" />
                    </div>
                  );'''
)

content = content.replace(
'''                  case 'cooling': return (
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-[1px] border-emerald-400/60 bg-gradient-to-br from-emerald-400/30 to-transparent  transform-gpu will-change-transform group-hover:border-emerald-400/100 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4),inset_0_0_15px_rgba(16,185,129,0.2)] transition-all duration-700 group-hover:rotate-[90deg] flex items-center justify-center overflow-hidden">
                      <div className="absolute w-full h-[1.5px] bg-emerald-400/50 group-hover:bg-emerald-400/60 transition-colors duration-700" />
                      <div className="absolute h-full w-[1.5px] bg-emerald-400/50 group-hover:bg-emerald-400/60 transition-colors duration-700" />
                      <div className="w-3.5 h-3.5 border-[1.5px] border-emerald-400/70 group-hover:border-emerald-300 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.8)_inset] transition-all duration-700 rotate-45" />
                    </div>
                  );''',
'''                  case 'cooling': return (
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-[2px] border-emerald-400/80 bg-gradient-to-br from-emerald-400/50 to-emerald-400/10 transform-gpu will-change-transform group-hover:border-emerald-400/100 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5),inset_0_0_15px_rgba(16,185,129,0.3)] transition-all duration-700 group-hover:rotate-[90deg] flex items-center justify-center overflow-hidden">
                      <div className="absolute w-full h-[2px] bg-emerald-400/70 group-hover:bg-emerald-400/90 transition-colors duration-700" />
                      <div className="absolute h-full w-[2px] bg-emerald-400/70 group-hover:bg-emerald-400/90 transition-colors duration-700" />
                      <div className="w-4 h-4 border-[2px] border-emerald-400/90 group-hover:border-emerald-300 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.9)_inset] transition-all duration-700 rotate-45" />
                    </div>
                  );'''
)

content = content.replace(
'''                  case 'other': return (
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rotate-45 border-[1.5px] border-white/40 bg-gradient-to-br from-white/20 to-transparent  group-hover:border-rose-400/60 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.2),inset_0_0_15px_rgba(255,255,255,0.1)] transition-all duration-700 group-hover:rotate-[225deg] flex items-center justify-center">
                      <div className="absolute inset-2 border-[0.5px] border-white/30 group-hover:border-rose-400/30 transition-colors duration-700 rounded-full" />
                      <div className="absolute top-1 left-1 w-1 h-1 bg-white/40 group-hover:bg-rose-300 rounded-full transition-all duration-700 group-hover:translate-x-1 group-hover:translate-y-1" />
                      <div className="absolute bottom-1 right-1 w-1 h-1 bg-white/40 group-hover:bg-rose-300 rounded-full transition-all duration-700 group-hover:-translate-x-1 group-hover:-translate-y-1" />
                      <div className="w-1.5 h-1.5 bg-slate-400 group-hover:bg-rose-400 rounded-full group-hover:shadow-[0_0_10px_rgba(244,63,94,1)] transition-all duration-700 group-hover:scale-150" />
                    </div>
                  );''',
'''                  case 'other': return (
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rotate-45 border-[2px] border-white/60 bg-gradient-to-br from-white/30 to-transparent group-hover:border-rose-400/80 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.3),inset_0_0_15px_rgba(255,255,255,0.2)] transition-all duration-700 group-hover:rotate-[225deg] flex items-center justify-center">
                      <div className="absolute inset-2 border-[1px] border-white/50 group-hover:border-rose-400/50 transition-colors duration-700 rounded-full" />
                      <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/60 group-hover:bg-rose-300 rounded-full transition-all duration-700 group-hover:translate-x-1 group-hover:translate-y-1" />
                      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-white/60 group-hover:bg-rose-300 rounded-full transition-all duration-700 group-hover:-translate-x-1 group-hover:-translate-y-1" />
                      <div className="w-2 h-2 bg-slate-300 group-hover:bg-rose-400 rounded-full group-hover:shadow-[0_0_10px_rgba(244,63,94,1)] transition-all duration-700 group-hover:scale-150" />
                    </div>
                  );'''
)

with open("src/components/Hero.tsx", "w", encoding="utf-8") as f:
    f.write(content)

