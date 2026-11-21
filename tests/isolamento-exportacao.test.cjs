const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
const start = html.indexOf('function buildExportScopeData(exportRows)');
const end = html.indexOf('// Exportação Completa Multi-Abas',start);
assert.ok(start !== -1 && end>start);
const source = html.slice(start,end);
function scope(rows) {
  const ctx=vm.createContext({getInclusionClassification:n=>n>=5?'Alta':'Normal'});
  vm.runInContext(source,ctx);
  return ctx.buildExportScopeData(rows);
}
const base = [
 {id:1,matricula:'001',funcionario:'Pessoa A',deptCodigo:'10',deptNome:'Dept A',isInclusao:true,isEsquecimento:true,isAbono:false,diasDiferenca:1},
 {id:2,matricula:'002',funcionario:'Pessoa B',deptCodigo:'10',deptNome:'Dept A',isInclusao:false,isEsquecimento:false,isAbono:true,diasDiferenca:0},
 {id:3,matricula:'003',funcionario:'Pessoa C',deptCodigo:'20',deptNome:'Dept B',isInclusao:true,isEsquecimento:true,isAbono:false,diasDiferenca:2},
 {id:4,matricula:'001',funcionario:'Pessoa A',deptCodigo:'20',deptNome:'Dept B',isInclusao:true,isEsquecimento:false,isAbono:false,diasDiferenca:0},
 {id:5,matricula:'001',funcionario:'Pessoa A',deptCodigo:'10',deptNome:'Dept A',isInclusao:true,isEsquecimento:true,isAbono:false,diasDiferenca:1}
];
test('departamento A não recebe empregado nem inclusões do departamento B',()=>{
 const result=scope(base.filter(x=>x.deptNome==='Dept A'));
 assert.equal(result.rows.length,3);
 assert.equal(result.employees.length,2);
 assert.ok(result.employees.every(x=>x.deptNome==='Dept A'));
 assert.equal(result.employees.find(x=>x.matricula==='001').totalInclusoesBatida,2);
 assert.ok(result.rows.filter(x=>x.matricula==='001').every(x=>x.totalInclusoesColab===2));
 assert.ok(!result.employees.some(x=>x.matricula==='003'));
});
test('departamento B mantém contadores próprios, mesmo com matrícula também presente em A',()=>{
 const result=scope(base.filter(x=>x.deptNome==='Dept B'));
 assert.equal(result.employees.length,2);
 assert.equal(result.employees.find(x=>x.matricula==='001').totalInclusoesBatida,1);
 assert.equal(result.employees.find(x=>x.matricula==='003').totalEsquecimentos,1);
});
test('seleção de duas unidades consolida sem misturar os mesmos empregados em departamentos distintos',()=>{
 const result=scope(base);
 assert.equal(result.rows.length,5);
 assert.equal(result.employees.length,4);
 const person=result.employees.filter(x=>x.matricula==='001');
 assert.equal(person.length,2);
 assert.deepEqual(Array.from(person,x=>x.totalInclusoesBatida).sort(),[1,2]);
});
test('planilha única e ZIP usam a função de escopo e não o mapa global',()=>{
 const exporter=html.slice(html.indexOf('async function exportStyledExcel('),html.indexOf('\n    </script>',html.indexOf('async function exportStyledExcel(')));
 assert.match(exporter,/const exportScope = buildExportScopeData\(exportRows\)/);
 assert.match(exporter,/const processedDataset = exportScope\.rows/);
 assert.match(exporter,/const allEmpSorted = exportScope\.employees/);
 assert.doesNotMatch(exporter,/Object\.values\(employeeStatsMap\)/);
 assert.match(html,/const subset = rows\.filter\(r => String\(r\.deptNome \|\| 'Não informada'\) === unit\.name\)/);
 assert.match(html,/await exportStyledExcel\(subset, \{returnBuffer:true\}\)/);
});
test('todas as abas analíticas reutilizam o escopo interno da exportação',()=>{
 const exporter=html.slice(html.indexOf('async function exportStyledExcel('),html.indexOf('\n    </script>',html.indexOf('async function exportStyledExcel(')));
 for(const name of ['Base_Tratada','Inconformidades','Resumo_Executivo','Analise_Por_Unidade','Ranking_Empregados','Analise_Motivos_ACT','Distribuicao_Temporal','Alertas_Auditoria'])
   assert.ok(exporter.includes(name) || (name==='Inconformidades' && exporter.includes('addConformitySheet')) ,name);
 assert.match(exporter,/buildBaseTratadaSheet\(setupStyledSheet, styles, processedDataset/);
 assert.match(exporter,/addConformitySheet\(workbook, processedDataset\)/);
 assert.match(exporter,/const abonoItems = processedDataset\.filter/);
 assert.match(exporter,/const alertItems = processedDataset\.filter/);
});
