const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
function fn(name) {
  const start = html.indexOf(`function ${name}(`);
  assert.notEqual(start, -1, `${name} existe`);
  let count = 0, open = html.indexOf('{', start);
  for (let i = open; i < html.length; i++) {
    if (html[i] === '{') count++;
    if (html[i] === '}' && --count === 0) return html.slice(start, i + 1);
  }
  throw Error('Função incompleta: ' + name);
}
const ctx = vm.createContext({});
for (const name of ['parseBrDate','getCompetence','isForgottenPunch']) vm.runInContext(fn(name),ctx);
test('competência segue mês da ocorrência', () => {
  assert.equal(ctx.getCompetence('31/10/2026'), '2026-10');
  assert.equal(ctx.getCompetence('01/11/2026'), '2026-11');
  assert.equal(ctx.getCompetence(''), '');
});
test('datas impossíveis não são normalizadas silenciosamente', () => {
  assert.equal(ctx.parseBrDate('31/02/2026'), null);
  assert.equal(ctx.parseBrDate('2026-13-01'), null);
  assert.equal(ctx.parseBrDate('31/11/2026'), null);
});
test('inclusão comum não é confundida com esquecimento', () => {
  assert.equal(ctx.isForgottenPunch({isInclusao:true,informacao:'Problema biométrico',motivo:'Inclusão de batida'}),false);
  assert.equal(ctx.isForgottenPunch({isInclusao:true,informacao:'Esqueci de bater ponto',motivo:''}),true);
  assert.equal(ctx.isForgottenPunch({isInclusao:false,informacao:'Esqueci de bater ponto',motivo:''}),false);
});
test('seletor de competência está conectado à reapuração', () => {
  assert.match(html, /id="competenceSelect"[^>]*onchange="changeCompetence\(\)"/);
  assert.match(html, /const scopedRows = selectedCompetence \?/);
  assert.match(html, /selectedCompetence && item\.isEsquecimento && empStat\.totalEsquecimentos > 4/);
});
