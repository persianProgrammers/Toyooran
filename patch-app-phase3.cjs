const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Insert import
content = content.replace(
  "import { MainAppInner } from './App';", 
  "import { MainAppInner } from './App';\nimport { PerfDebuggerPhase3 } from './components/PerfDebuggerPhase3';"
);
content = content.replace(
  "import { Footer } from './components/Footer';",
  "import { Footer } from './components/Footer';\nimport { PerfDebuggerPhase3 } from './components/PerfDebuggerPhase3';"
);

// Insert context setup
const contextSetup = `
  const [debugContext, setDebugContext] = useState({
    navbar: true,
    hero: true,
    footer: true,
    cursor: true,
    scrollProgress: true,
  });

  useEffect(() => {
    const handler = (e: any) => setDebugContext(e.detail);
    window.addEventListener('perf-debugger-phase3', handler);
    return () => window.removeEventListener('perf-debugger-phase3', handler);
  }, []);
`;

content = content.replace(
  'const MainAppInner: React.FC = () => {',
  'const MainAppInner: React.FC = () => {' + contextSetup
);

// Replace elements
content = content.replace(
  '<ScrollToTop />',
  '<PerfDebuggerPhase3 />\n      <ScrollToTop />'
);

content = content.replace(
  '<CustomCursor />',
  '{debugContext.cursor && <CustomCursor />}'
);

content = content.replace(
  '<ScrollProgress />',
  '{debugContext.scrollProgress && <ScrollProgress />}'
);

content = content.replace(
  '<Navbar',
  '<div className={!debugContext.navbar ? "disable-framer-target contents" : "contents"}><Navbar'
);
content = content.replace(
  'onOpenAiAssistant={() => setIsAiAssistantOpen(true)}\n      />',
  'onOpenAiAssistant={() => setIsAiAssistantOpen(true)}\n      /></div>'
);

content = content.replace(
  '<Hero',
  '<div className={!debugContext.hero ? "disable-framer-target contents" : "contents"}><Hero'
);
content = content.replace(
  '<AboutContactUnifiedSection />\n              </Hero>',
  '<AboutContactUnifiedSection />\n              </Hero></div>'
);

content = content.replace(
  '<Footer',
  '<div className={!debugContext.footer ? "disable-framer-target contents" : "contents"}><Footer'
);
content = content.replace(
  'categories={categories}\n      />',
  'categories={categories}\n      /></div>'
);

fs.writeFileSync('src/App.tsx', content);
