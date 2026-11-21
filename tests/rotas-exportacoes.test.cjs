const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
test('rota em hash existe para cada aba e suporta histórico do navegador', () => {
 for (const route of ['/dashboard','/base','/empregados','/unidades','/alertas']) assert.ok(html.includes(`'${route}'`));
 assert.match(html, /addEventListener\('hashchange', applyLocationRoute\)/);
 assert.match(html, /function applyLocationRoute\(\)/);
});
test('botão da appbar abre modal e exporta escopo selecionado', () => {
 assert.match(html, /id="btnExportSingle" onclick="openExportModal\(\)"/);
 assert.match(html, /id="exportModal"/);
 assert.match(html, /function getExportRows\(\)/);
 assert.match(html, /const processedDataset = exportRows/);
 assert.match(html, /async function confirmExportSelection\(\)/);
});
test('competência única consolidada sem filtro por mês de ocorrência', () => {
 assert.match(html, /value="Consolidada"/);
 assert.match(html, /const scopedRows = rows;/);
 assert.match(html, /function changeCompetence\(\)/);
});
test('navegação por unidade e matrícula possui rota própria', () => {
 assert.match(html, /location.hash = '#\/unidades\/'/);
 assert.match(html, /location.hash = '#\/empregados\/'/);
});

test('escopo de exportação seleciona exclusivamente unidades marcadas', () => {
  const vm = require('node:vm');
  const method = html.match(/function getExportRows\(\) \{[\s\S]*?\n        \}/)?.[0];
  assert.ok(method);
  const dataset = [{deptNome:'Unidade A',id:1},{deptNome:'Unidade B',id:2},{deptNome:'Unidade C',id:3},{deptNome:'Unidade A',id:4}];
  const input = {value:'units'};
  const doc = {
    querySelector: () => input,
    querySelectorAll: () => [{value:'Unidade A'},{value:'Unidade C'}]
  };
  const run = (mode) => vm.runInNewContext(method + '; getExportRows().map(x=>x.id)', {processedDataset:dataset,document: { ...doc, querySelector:()=>({value:mode}) }});
  assert.deepEqual([...run('units')],[1,3,4]);
  assert.deepEqual([...run('all')],[1,2,3,4]);
});
