import re

for filename in ["src/components/AboutContactUnifiedSection.tsx", "src/components/ContactPage.tsx"]:
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()

    # Need to find the map block precisely
    pattern = r'\{\/\*\s*Map Background\s*\*\/\}.*?(?=\{\/\*\s*Left Edge Glow\s*\*\/\})'
    
    replacement = """{/* Elegant Graphic Background instead of Map */}
                            <div className="absolute inset-0 z-0 bg-slate-900 overflow-hidden">
                              {/* Background Patterns */}
                              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.15)_0%,_transparent_70%)]" />
                              <div className="absolute top-[20%] right-[20%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[80px]" />
                              <div className="absolute bottom-[20%] left-[20%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[80px]" />
                              
                              {/* Central Abstract Logo / Icon Element */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-30 mix-blend-screen pointer-events-none">
                                 <div className="w-64 h-64 border border-white/5 rounded-full flex items-center justify-center animate-[spin_60s_linear_infinite]">
                                    <div className="w-48 h-48 border border-white/10 rounded-full flex items-center justify-center animate-[spin_40s_linear_infinite_reverse]">
                                       <div className="w-32 h-32 border-2 border-amber-500/20 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-xl shadow-[0_0_50px_rgba(251,191,36,0.1)]">
                                          {activeLocation.type === 'headquarter' ? <Building2 className="w-12 h-12 text-amber-500/60" /> : 
                                           activeLocation.type === 'factory' ? <Factory className="w-12 h-12 text-amber-500/60" /> : 
                                           <MapPin className="w-12 h-12 text-amber-500/60" />}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              
                              {/* Soft Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#001c3d] via-[#001c3d]/80 to-transparent z-10" />
                            </div>
                            
                            """
                            
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

