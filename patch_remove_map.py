import re

for filename in ["src/components/AboutContactUnifiedSection.tsx", "src/components/ContactPage.tsx"]:
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()

    # Find the entire background map section
    start_str = '{/* Map Background */}'
    end_str = '{/* Left Edge Glow */}'
    
    if start_str in content and end_str in content:
        start_idx = content.find(start_str)
        end_idx = content.find(end_str)
        
        replacement = """{/* Elegant Graphic Background instead of Map */}
                            <div className="absolute inset-0 z-0 bg-slate-900 overflow-hidden">
                              {/* Background Patterns */}
                              <div className="absolute inset-0 bg-[url('/images/pattern-circuit.svg')] opacity-5" />
                              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.15)_0%,_transparent_70%)]" />
                              <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] bg-blue-500/10 rounded-full blur-3xl opacity-50" />
                              <div className="absolute -bottom-[20%] -left-[10%] w-[70%] h-[70%] bg-amber-500/10 rounded-full blur-3xl opacity-50" />
                              
                              {/* Central Abstract Shape */}
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/5 rounded-full flex items-center justify-center">
                                <div className="w-48 h-48 border border-white/10 rounded-full flex items-center justify-center">
                                  <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-sm shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                                    {isHQ ? <Building2 className="w-12 h-12 text-white/20" /> : 
                                     isFact ? <Factory className="w-12 h-12 text-white/20" /> : 
                                     <MapPin className="w-12 h-12 text-white/20" />}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Overlay Gradient */}
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/20 z-10" />
                            </div>
                            
                            """
        
        content = content[:start_idx] + replacement + content[end_idx:]
        
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

