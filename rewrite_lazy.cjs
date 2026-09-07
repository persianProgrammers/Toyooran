const fs = require('fs');
let code = `import React, { useState, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';

export const LazyImage = ({ src, alt, className, imgClassName, fallbackSrc = '/images/product-placeholder.svg' }: { src: string, alt?: string, className?: string, imgClassName?: string, fallbackSrc?: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
  }, [src]);

  return (
    <div className={\`relative overflow-hidden bg-slate-200 \${className || ''}\`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-slate-400 animate-pulse" />
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt || ''}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
          } else {
             // even fallback failed, let's just stop showing error loop
             setIsLoaded(true);
          }
        }}
        className={\`transition-all duration-700 \${imgClassName || 'w-full h-full object-cover'} \${isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-sm scale-105'}\`}
      />
    </div>
  );
};
`;
fs.writeFileSync('src/components/LazyImage.tsx', code);
