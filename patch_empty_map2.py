import re

with open("src/components/ContactPage.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old_empty = """<div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-[url('/images/cubes.png')] opacity-5" />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.08)_0%,_transparent_50%)]" />
                                    
                                    <Map className="w-16 h-16 text-white/5 relative z-10" />
                                 </div>"""

new_empty = """<div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-slate-900/80">
                                    <div className="absolute inset-0 bg-[url('/images/cubes.png')] opacity-10" />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.1)_0%,_transparent_60%)]" />
                                    <div className="w-24 h-24 rounded-3xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center relative z-10 mb-4 shadow-lg">
                                       <Map className="w-10 h-10 text-slate-500" />
                                    </div>
                                    <span className="text-slate-400 font-medium text-sm relative z-10">موقعیت مکانی ثبت نشده است</span>
                                 </div>"""

content = content.replace(old_empty, new_empty)

with open("src/components/ContactPage.tsx", "w", encoding="utf-8") as f:
    f.write(content)

