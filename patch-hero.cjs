const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.tsx', 'utf8');

// Insert context setup
const contextSetup = `
  const [debugPhase4, setDebugPhase4] = useState({
    bouncingIndicator: true,
    backgroundSlider: true,
    serviceCards: true,
    backdropBlurs: true,
    textAnimations: true,
  });

  useEffect(() => {
    const handler = (e: any) => setDebugPhase4(e.detail);
    window.addEventListener('perf-debugger-phase4', handler);
    return () => window.removeEventListener('perf-debugger-phase4', handler);
  }, []);
`;

content = content.replace(
  'const cardsSectionRef = useRef<HTMLDivElement>(null);',
  'const cardsSectionRef = useRef<HTMLDivElement>(null);' + contextSetup
);

// Conditionally wrap text animations (we can't easily turn off motion.div without a lot of regex, but we can change the wrapper to standard div or just disable initial/animate props)
// Actually, easier way for text animations is just letting Framer Motion run but checking the backdrop blurs which we did globally.
// Let's replace the bouncing scroll indicator wrapper
content = content.replace(
  '{/* Scroll Indicator */}\n        <motion.div',
  '{/* Scroll Indicator */}\n        {debugPhase4.bouncingIndicator && <motion.div'
);
content = content.replace(
  '          </div>\n        </motion.div>',
  '          </div>\n        </motion.div>}'
);

// Replace LazyHeroImage mapping
content = content.replace(
  '{heroImages.map((src, index) => (\n            <LazyHeroImage\n              key={src}\n              src={src}\n              alt="شرکت طیوران صنعت پویا"\n              isActive={currentImageIndex === index}\n            />\n          ))}',
  '{debugPhase4.backgroundSlider && heroImages.map((src, index) => (\n            <LazyHeroImage\n              key={src}\n              src={src}\n              alt="شرکت طیوران صنعت پویا"\n              isActive={currentImageIndex === index}\n            />\n          ))}'
);

// Disable the setInterval for changing images
content = content.replace(
  'const interval = setInterval(() => {\n      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);\n    }, 5000);',
  'let interval: any;\n    if (debugPhase4.backgroundSlider) {\n      interval = setInterval(() => {\n        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);\n      }, 5000);\n    }'
);

// Hide ServiceCards
content = content.replace(
  '{categoryCards.map((card, idx) => (\n                    <ServiceCard key={idx} idx={idx} card={card} onClick={() => onSelectCategory(card.id)} />\n                  ))}',
  '{debugPhase4.serviceCards && categoryCards.map((card, idx) => (\n                    <ServiceCard key={idx} idx={idx} card={card} onClick={() => onSelectCategory(card.id)} />\n                  ))}'
);

// Also hide the Ultra-Wide Premium Brand Banner because it has intense CSS and gradients
content = content.replace(
  '{/* Ultra-Wide Premium Brand Banner */}\n                <div className="mt-8 relative group',
  '{/* Ultra-Wide Premium Brand Banner */}\n                {debugPhase4.serviceCards && <div className="mt-8 relative group'
);
content = content.replace(
  '                       </div>\n                    </div>\n                </div>\n              </div>',
  '                       </div>\n                    </div>\n                </div>}\n              </div>'
);

fs.writeFileSync('src/components/Hero.tsx', content);
