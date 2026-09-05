import sys

with open('src/components/ContactPage.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

with open('tmp_unified_locations.tsx', 'r', encoding='utf-8') as f:
    unified_locations = f.read()

# Make unified_locations look like exactly what is needed for section 2:
# Basically, replace `<div className="mt-16 sm:mt-24 relative z-10">` with `<div className="relative z-10 w-full flex-1 flex flex-col">` maybe?
# The wrapper in ContactPage.tsx is just the section 2 container.

# Actually, I'll completely overwrite lines 178-290 of ContactPage.tsx
section2_start_marker = '{/* Section 2: Massive Dark Cinematic Locations Card'
section2_start = content.find(section2_start_marker)
section2_end_marker = '</div>\n\n      </div>\n    </div>\n  );\n};'
section2_end = content.find(section2_end_marker)

if section2_start == -1 or section2_end == -1:
    print("Could not find boundaries")
    print("start:", section2_start, "end:", section2_end)
    sys.exit(1)

# Now, we also want to change Section 1's dark box (Contact Direct Info Box) to use `bg-[#001c3d]` instead of `bg-slate-950`
# Let's do it string-replace style
contact_page_before_section2 = content[:section2_start]
contact_page_after_section2 = content[section2_end:]

# Replace bg-slate-950 with bg-[#001c3d] in the before part
contact_page_before_section2 = contact_page_before_section2.replace('bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden group', 'bg-[#001c3d] text-white rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-8 lg:p-12 border-none shadow-[0_30px_60px_rgba(0,0,0,0.15)] relative overflow-hidden group')

# Modify the unified_locations to remove the outermost conditional and div if we want, or just wrap it in the dark card style
# Let's strip the first line which is `<div className="mt-16 sm:mt-24 relative z-10">`
# Wait, `tmp_unified_locations.tsx` starts at line 138: `<div className="mt-16 sm:mt-24 relative z-10">`
# and ends at line 258: `</div>`

unified_locations_content = unified_locations.strip()
if unified_locations_content.endswith(')}'):
    unified_locations_content = unified_locations_content[:-2].strip()

if unified_locations_content.startswith('<div className="mt-16 sm:mt-24 relative z-10">'):
    unified_locations_content = unified_locations_content[len('<div className="mt-16 sm:mt-24 relative z-10">'):].strip()
    # Need to remove the last </div>
    if unified_locations_content.endswith('</div>'):
        unified_locations_content = unified_locations_content[:-6].strip()

new_section_2 = """{/* Section 2: Massive Dark Cinematic Locations Card (from unified section) */}
        <div className="bg-[#001c3d] rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-12 lg:p-16 relative overflow-hidden flex flex-col shadow-[0_30px_60px_rgba(0,0,0,0.15)] border-none">
          {/* Ambient Background Magic */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.08)_0%,_transparent_70%)] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(0,63,134,0.15)_0%,_transparent_70%)] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
          <div className="absolute inset-0 bg-[url('/images/cubes.png')] opacity-[0.03] pointer-events-none" />
          
          <div className="relative z-10 w-full">
            """ + unified_locations_content + """
          </div>
        </div>
"""

new_content = contact_page_before_section2 + new_section_2 + contact_page_after_section2

with open('src/components/ContactPage.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Patched successfully")
