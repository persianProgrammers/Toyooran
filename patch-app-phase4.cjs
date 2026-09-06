const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace import
content = content.replace(
  "import { PerfDebuggerPhase3 } from './components/PerfDebuggerPhase3';",
  "import { PerfDebuggerPhase4 } from './components/PerfDebuggerPhase4';"
);

// Replace tag
content = content.replace(
  "<PerfDebuggerPhase3 />",
  "<PerfDebuggerPhase4 />"
);

fs.writeFileSync('src/App.tsx', content);
