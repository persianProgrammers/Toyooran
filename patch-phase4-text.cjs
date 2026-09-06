const fs = require('fs');

let content = fs.readFileSync('src/components/PerfDebuggerPhase4.tsx', 'utf8');

content = content.replace(
  "document.getElementById('debug-blurs')?.remove();\n    }",
  `document.getElementById('debug-blurs')?.remove();\n    }\n\n    if (!suspects.textAnimations) {\n      const style = document.createElement('style');\n      style.id = 'debug-text';\n      style.innerHTML = \`.hero-text-anim { transform: none !important; opacity: 1 !important; }\`;\n      document.head.appendChild(style);\n    } else {\n      document.getElementById('debug-text')?.remove();\n    }`
);

fs.writeFileSync('src/components/PerfDebuggerPhase4.tsx', content);
