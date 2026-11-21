const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');

test('todos os elementos estáticos acessados por getElementById existem no HTML', () => {
  const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map(x=>x[1]));
  const referenced = new Set([...html.matchAll(/document\.getElementById\(["']([^"']+)["']\)/g)].map(x=>x[1]));
  const missing = [...referenced].filter(id=>!ids.has(id));
  assert.deepEqual(missing, [], `IDs ausentes: ${missing.join(', ')}`);
});

test('seis KPIs avançados e a tabela de gestores estão presentes', () => {
  for (const id of ['extraApproval','extraDecision','extraLate','extraRejected','extraForgotten','extraManagers','managerDashboardBody']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
});

test('erros de processamento não são confundidos com falhas de leitura da planilha', () => {
  assert.match(html, /Falha ao processar base consolidada/);
  assert.match(html, /Erro na importação/);
  assert.doesNotMatch(html, /Falha ao ler a planilha\. Verifique se o arquivo não está protegido por senha/);
});

test('rotas de empregados e unidades continuam conectadas aos painéis', () => {
  assert.match(html, /function openAllUnits\(/);
  assert.match(html, /function openUnitEmployees\(/);
  assert.match(html, /function openEmployeeAnalysis\(/);
  assert.match(html, /tabUnits: '\/unidades'/);
  assert.match(html, /tabEmployees: '\/empregados'/);
});
