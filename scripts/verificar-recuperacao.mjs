import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { Script } from 'node:vm';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => readFileSync(resolve(root, file), 'utf8');
const manifest = JSON.parse(read('recovery/sha256.json'));
const errors = [];
for (const [file, expected] of Object.entries(manifest)) {
  if (!existsSync(resolve(root, file))) {
    errors.push(`Arquivo ausente: ${file}`);
    continue;
  }
  const actual = createHash('sha256').update(readFileSync(resolve(root, file))).digest('hex');
  if (actual !== expected) errors.push(`Conteúdo alterado: ${file}`);
}

let scripts = 0;
for (const file of ['index.html', 'painel.html', 'balcao.html', 'bio.html', 'products.js']) {
  const source = read(file);
  const blocks = file.endsWith('.js') ? [source] : [...source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script\s*>/gi)].map((m) => m[1]);
  for (const code of blocks.filter((text) => text.trim())) {
    try { new Script(code, { filename: file }); scripts++; }
    catch (error) { errors.push(`Sintaxe em ${file}: ${error.message}`); }
  }
  for (const [, path] of source.matchAll(/(?:src\s*=\s*["']|["'])(assets\/[^"'\s<>]+|products\.js)/g)) {
    if (!existsSync(resolve(root, path.split(/[?#]/)[0]))) errors.push(`Referência ausente em ${file}: ${path}`);
  }
}
JSON.parse(read('recovery/catalogo-publicado.json'));
if (errors.length) {
  console.error([...new Set(errors)].join('\n'));
  process.exitCode = 1;
} else {
  console.log(`OK: ${Object.keys(manifest).length} arquivos íntegros, ${scripts} scripts com sintaxe válida e referências locais presentes.`);
  console.log('Backend, pagamentos e impressão não fazem parte desta verificação.');
}
