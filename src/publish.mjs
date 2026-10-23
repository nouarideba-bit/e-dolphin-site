// Copies the built site (v2/) to the repository root, which GitHub Pages serves at the main address.
// v2/ stays in place so links already shared keep working. Run with: npm run build (it calls this last).
import { cpSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

// Scripts and the stylesheet get a content stamp (?v=…) so a redeploy reaches visitors at once: GitHub Pages lets
// browsers keep these files for 10 minutes, long enough to show a new page with an old script (23 Oct 2026).
const stamp = (f) => { try { return createHash('md5').update(readFileSync(`v2/assets/${f}`)).digest('hex').slice(0, 8); } catch { return null; } };
for (const dir of ['v2', 'v2/en']) for (const name of readdirSync(dir).filter(n => n.endsWith('.html'))) {
  const p = `${dir}/${name}`, html = readFileSync(p, 'utf8');
  const out = html.replace(/(assets\/((?:js\/)?[\w.-]+\.(?:js|css)))(\?v=\w+)?"/g, (m, path, f) => { const v = stamp(f); return v ? `${path}?v=${v}"` : m; });
  if (out !== html) writeFileSync(p, out);
}

cpSync('v2', '.', { recursive: true });
console.log('published v2/ to site root');
