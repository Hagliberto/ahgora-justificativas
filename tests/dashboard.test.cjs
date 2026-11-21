const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');

const names = ['globalDateStart','globalDateEnd','globalEmployee','globalManager','globalBranch','globalRegime','globalRisk','chartStatus','chartManager','chartEmployee','chartWeekday','managerDashboardBody'];
test('painel contém filtros, gráficos e painel de gestores',()=>{
  for(const name of names) assert.match(html,new RegExp(`id="${name}"`),name);
  assert.match(html,/onclick="exportDashboardExcel\(\)"/);
});

test('filtros globais respeitam datas de ocorrência e cruzam gestor, filial e matrícula',()=>{
  const body = html.match(/function applyFilters\(\) \{([\s\S]*?)\n        \}\n\n        \/\/ ===/);
  assert.ok(body,'função applyFilters existe');
  for(const key of ['globalStart','globalEnd','globalEmployee','globalManager','globalBranch','globalRegime','globalRisk']) assert.ok(body[1].includes(key),key);
  assert.match(body[1],/item\.dataJustificativaIso/);
  assert.match(body[1],/renderEmployeeTab\(\)/);
  assert.match(body[1],/renderUnitTab\(\)/);
  assert.match(body[1],/renderAlertsTab\(\)/);
});

test('métricas de gestor usam decisão com data válida e preservam sem decisão',()=>{
  const source = html.match(/function isLateApproval\(item\) \{[\s\S]*?\n        function renderDashboardAdvanced\(\)/)[0].replace(/\n        function renderDashboardAdvanced\(\)$/,'');
  const context = vm.createContext({parseBrDate: str => str ? new Date(str) : null, Map});
  vm.runInContext(source, context);
  const a={gestor:'G1',status:'Pendente',dtSolicitacao:new Date('2026-11-12T10:00:00Z'),dataAprovacao:'',flagsAuditoria:[]};
  const b={gestor:'G1',status:'Aprovada',dtSolicitacao:new Date('2026-11-10T10:00:00Z'),dataAprovacao:'2026-11-12T10:00:00Z',flagsAuditoria:['Triagem']};
  assert.equal(context.isLateApproval(a),false);
  assert.equal(context.isLateApproval(b),true);
  const result=context.summarizeManagers([a,b]);
  assert.equal(result[0].total,2);
  assert.equal(result[0].pendentes,1);
  assert.equal(result[0].late,1);
  assert.equal(result[0].decisions,1);
  assert.equal(result[0].sumHours,48);
});
