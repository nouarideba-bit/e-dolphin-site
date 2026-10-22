// Copies the built site (v2/) to the repository root, which GitHub Pages serves at the main address.
// v2/ stays in place so links already shared keep working. Run with: npm run build (it calls this last).
import { cpSync } from 'node:fs';
cpSync('v2', '.', { recursive: true });
console.log('published v2/ to site root');
