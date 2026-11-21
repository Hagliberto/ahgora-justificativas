const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');

test('filtro global por unidade e opções de auditoria visual existem',()=>{
  assert.match(html,/id="globalUnit"/);
  assert.match(html,/fillSelect\('globalUnit'/);
  for (const v of ['inclusions','other-inclusions','forgotten','recurrent-forgotten']) assert.ok(html.includes(`value="${v}"`));
  assert.match(html,/if \(globalUnit && item\.deptNome !== globalUnit\)/);
});
test('painel de inclusões possui os indicadores e gráficos previstos',()=>{
  for(const id of ['punchTotal','punchForgotten','punchOther','punchRecurrent','chartPunchTypes','chartPunchEmployees']) assert.ok(html.includes(`id="${id}"`));
  assert.match(html,/function renderPunchDashboard\(records\)/);
});
test('ZIP gera planilha por unidade usando buffer XLSX preservando estilo',()=>{
  assert.match(html,/name="exportScope" value="zip"/);
  assert.match(html,/new JSZip\(\)/);
  assert.match(html,/await exportStyledExcel\(subset, \{returnBuffer:true\}\)/);
  assert.match(html,/return await workbook\.xlsx\.writeBuffer\(\)/);
  assert.match(html,/zip\.file\(filename, buffer\)/);
});
test('cabeçalhos e competência estão padronizados',()=>{
  assert.match(html,/>Exportar análise<\/h2>/);
  assert.doesNotMatch(html,/>Exportar análise CAERN<\/h2>/);
  assert.match(html,/>Departamento<\/th>/);
  assert.match(html,/Gestor ou Núcleo de Pessoal/);
  assert.match(html,/function formatCompetenceBR\(value\)/);
  assert.match(html,/competencia: formatCompetenceBR\(f\.competencia\)/);
});
