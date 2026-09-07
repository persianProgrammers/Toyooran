import re

for filename in ["src/components/AboutContactUnifiedSection.tsx", "src/components/ContactPage.tsx"]:
    with open(filename, "r", encoding="utf-8") as f:
        content = f.read()

    # Find the entire map background block, including the iframe condition
    pattern = r'\{\/\*\s*Map Background\s*\*\/\}.*?\{\/\*\s*Massive Dark Gradient Overlay for Typography\s*\*\/\}'
    
    replacement = """{/* Elegant Graphic Background instead of Map */}
                            <div className="absolute inset-0 z-0 bg-[#001c3d] overflow-hidden">
                              {/* Background Patterns */}
                              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.08)_0%,_transparent_70%)]" />
                              <div className="absolute top-[20%] right-[20%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[100px]" />
                              <div className="absolute bottom-[20%] left-[20%] w-[50%] h-[50%] bg-amber-500/5 rounded-full blur-[100px]" />
                              
                              {/* Central Abstract Logo / Icon Element */}
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                 <div className="w-80 h-80 border border-white/5 rounded-full flex items-center justify-center animate-[spin_60s_linear_infinite]">
                                    <div className="w-56 h-56 border border-white/10 rounded-full flex items-center justify-center animate-[spin_40s_linear_infinite_reverse]">
                                       <div className="w-32 h-32 border border-amber-500/20 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-xl shadow-[0_0_50px_rgba(251,191,36,0.1)]">
                                          {activeLocation.type === 'headquarter' ? <Building2 className="w-12 h-12 text-amber-500/60" /> : 
                                           activeLocation.type === 'factory' ? <Factory className="w-12 h-12 text-amber-500/60" /> : 
                                           <MapPin className="w-12 h-12 text-amber-500/60" />}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              
                              {/* Soft Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#001c3d] via-[#001c3d]/60 to-transparent z-10" />
                            </div>
                            
                            {/* Massive Dark Gradient Overlay for Typography */}"""
                            
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

