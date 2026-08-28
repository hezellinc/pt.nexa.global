const fs = require('fs');

let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// Add ChevronUp, ChevronDown imports if not present
if (!content.includes('ChevronUp')) {
  content = content.replace('AlignRight, X', 'AlignRight, X, ChevronUp, ChevronDown');
}

// Add state for pagination
if (!content.includes('const [startIndex, setStartIndex]')) {
  content = content.replace('const [isOpen, setIsOpen] = useState(false);', 'const [isOpen, setIsOpen] = useState(false);\n  const [startIndex, setStartIndex] = useState(0);\n  const ITEMS_PER_PAGE = 5;');
}

// Ensure reset startIndex when opening menu
content = content.replace(
  'onClick={() => setIsOpen(!isOpen)}',
  'onClick={() => { setIsOpen(!isOpen); setStartIndex(0); }}'
);

// Modify the mapping logic
const originalMap = `{navLinks.map((link, index) => (`;
const newMap = `              {startIndex > 0 && (
                <button 
                  onClick={() => setStartIndex(Math.max(0, startIndex - ITEMS_PER_PAGE))}
                  className="w-full py-2 flex items-center justify-center text-text/50 hover:text-primary transition-colors"
                >
                  <ChevronUp size={24} />
                </button>
              )}
              {navLinks.slice(startIndex, startIndex + ITEMS_PER_PAGE).map((link, index) => (`

content = content.replace(originalMap, newMap);

const originalMapEnd = `                </motion.a>
              ))}
            </div>`;

const newMapEnd = `                </motion.a>
              ))}
              {startIndex + ITEMS_PER_PAGE < navLinks.length && (
                <button 
                  onClick={() => setStartIndex(Math.min(navLinks.length - ITEMS_PER_PAGE, startIndex + ITEMS_PER_PAGE))}
                  className="w-full py-2 flex items-center justify-center text-text/50 hover:text-primary transition-colors"
                >
                  <ChevronDown size={24} />
                </button>
              )}
            </div>`;

content = content.replace(originalMapEnd, newMapEnd);

fs.writeFileSync('src/components/Navbar.tsx', content);
