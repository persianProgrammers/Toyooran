import re

for filename in ["src/components/AboutContactUnifiedSection.tsx", "src/components/ContactPage.tsx"]:
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()

    # Make iframe fully visible, remove grayscale and opacity constraints
    content = content.replace(
        'className="w-full h-full grayscale-[50%] opacity-60 group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-700 object-cover"',
        'className="w-full h-full object-cover"'
    )
    
    # Make overlay much lighter, just enough to read text
    content = content.replace(
        '<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10 pointer-events-none" />',
        '<div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10 pointer-events-none" />'
    )
    
    # Replace the ugly empty state with something elegant
    old_empty = """<div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-slate-900/80">
                                    <div className="absolute inset-0 bg-[url('/images/cubes.png')] opacity-10" />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.1)_0%,_transparent_60%)]" />
                                    <div className="w-24 h-24 rounded-3xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center relative z-10 mb-4 shadow-lg">
                                       <Map className="w-10 h-10 text-slate-500" />
                                    </div>
                                    <span className="text-slate-400 font-medium text-sm relative z-10">موقعیت مکانی ثبت نشده است</span>
                                 </div>"""
                                 
    new_empty = """<div className="absolute inset-0 bg-slate-900 overflow-hidden flex items-center justify-center">
                                    {/* Elegant animated background */}
                                    <div className="absolute inset-0 opacity-20">
                                      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse" />
                                      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
                                    </div>
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.8)_100%)]" />
                                    
                                    <div className="relative z-10 flex flex-col items-center opacity-40">
                                      <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                                        <Building2 className="w-8 h-8 text-white/40" />
                                      </div>
                                    </div>
                                 </div>"""
                                 
    content = content.replace(old_empty, new_empty)

    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

