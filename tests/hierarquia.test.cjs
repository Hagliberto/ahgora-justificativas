const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const pkg = require('../package.json');

test('versão 2.7.0 consistente no pacote e interface', () => {
  assert.equal(pkg.version, '2.7.0');
  assert.match(html, /Versão 2\.7\.0/);
  assert.match(html, /v2\.7\.0/);
});
test('appbar contém competência, navegação e nota discreta', () => {
  const header = html.slice(html.indexOf('<header'), html.indexOf('</header>'));
  assert.match(header, /id="competenceSelect"/);
  assert.match(header, /id="normativeInfo"/);
  for(const tab of ['tabOverview','tabRecords','tabEmployees','tabUnits','tabAlerts']) assert.ok(header.includes(`btn-${tab}`));
  assert.equal((html.match(/id="competenceSelect"/g)||[]).length,1);
});
test('fluxo unidade → empregado → ficha e histórico de todas as competências importadas', () => {
  assert.match(html,/function openUnitEmployees\(index(?:, updateRoute = true)?\)/);
  assert.match(html,/function openEmployeeAnalysis\(index\)/);
  assert.match(html,/function monthHistoryForEmployee\(matricula\)/);
  assert.match(html,/fullImportedDataset\.forEach\(row =>/);
  assert.match(html,/id="employeeDetail"/);
});
test('nome analítico segue justificativas_Analitica_CAERN_DD.MM.AAAA.xlsx', () => {
  assert.match(html,/`justificativas_Analitica_CAERN_\$\{new Date\(\)\.toLocaleDateString\('pt-BR'\)\.replaceAll\('\/', '\.'\)\}\.xlsx`/);
});
