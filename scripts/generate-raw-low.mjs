import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const src = readFileSync(join('Data Base', 'LowQ.ts'), 'utf8');
const body = src.replace(/^string = `\r?\n?/, '').replace(/['`]\s*$/, '').trimEnd();
const out = `export const RAW_LOW: string = \`\n${body}\n\`;\n`;

const dirs = [
  'chat-version-low',
  'chat-version-API-low',
  'sci-version-low',
  'sci-version-API-low',
];

for (const d of dirs) {
  const p = join(d, 'src', 'data', 'raw-low.ts');
  writeFileSync(p, out, 'utf8');
  console.log('wrote', p);
}
