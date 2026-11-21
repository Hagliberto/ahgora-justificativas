const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync(require('node:path').join(__dirname, '../index.html'), 'utf8');
const from = html.indexOf('        function normMonth(item)');
const until = html.indexOf('        function renderAlertsTab()', from);
assert.ok(from > 0 && until > from);
const source = html.slice(from, until);
function parseBrDate(input) {
  if (!input) return null;
  const m = String(input).match(/^(\d\d)\/(\d\d)\/(\d{4})(?:\s+(\d\d):(\d\d))?/);
  return m ? new Date(+m[3],+m[2]-1,+m[1],+(m[4]||0),+(m[5]||0)) : null;
}
const context = vm.createContext({parseBrDate, Date, console, selectedCompetence:'Consolidada'});
vm.runInContext(source,context);
function row(id, month='2026-11', matricula='000123', extra={}) {
 return {id, matricula, funcionario:'EMPREGADO TESTE', deptNome:'Unidade A',deptCodigo:'10',filial:'01',
    gestor:'Gestor Teste',tipo:'Inclusão de batida',isInclusao:true,isEsquecimento:true,
    dataJustificativaIso:`${month}-04`,dataJustificativaStr:'04/11/2026',dtJustificativa:new Date(2026,10,4),
    dtSolicitacao:new Date(2026,10,4),diasDiferenca:0,dataAprovacao:'',informacao:'Esqueci de bater ponto',
    motivo:'',grupoRegra:'Padrão',localizacaoOriginal:'',...extra};
}
function findings(rows, reference=rows) {return context.getConformityFindings(rows,reference);}
test('rota, aba, filtros e exportação normativos estão integrados',()=>{
 for (const token of ["tabConformidade: '/inconformidades'", "tabConformidade: '/inconformidades'",'id="conformityTableBody"','id="confUnit"','id="confRule"','id="confSeverity"','id="confSearch"','function exportConformityReport()',"workbook.addWorksheet('Inconformidades')"]) assert.ok(html.includes(token),token);
 assert.match(html,/addConformitySheet\(workbook, processedDataset\)/);
});
test('competência única reúne meses sem confundir inclusões comuns',()=>{
 const data = [1,2,3,4].map(i=>row(i));
 data.push(row(5,'2026-12'));
 data.push(row(6,'2026-11','000123',{isEsquecimento:false,informacao:'Falha biométrica'}));
 const incidents=findings(data).filter(f=>f.regraId==='ESQUECIMENTO');
 assert.equal(incidents.length,1);
 assert.equal(incidents[0].quantidade,5);
 assert.equal(incidents[0].competencia,'Consolidada');
 assert.equal(incidents[0].prioridade,'Informativa');
 assert.match(incidents[0].evidencia,/não é possível concluir excesso mensal/);
});
test('matrículas distintas não são misturadas e um filtro não oculta o total da competência',()=>{
 const data=[...Array.from({length:5},(_,i)=>row(i+1)),...Array.from({length:4},(_,i)=>row(i+6,'2026-11','000999'))];
 const filtered=[data[1]];
 assert.equal(findings(filtered,data).filter(f=>f.regraId==='ESQUECIMENTO').length,1);
 assert.equal(findings(data).filter(f=>f.regraId==='ESQUECIMENTO').length,1);
});
test('aprovação >24 horas é informativa por divergência entre manual e norma',()=>{
 const data=[row(1,'2026-11','000123',{isEsquecimento:false,dataAprovacao:'06/11/2026 12:00'})];
 const warning=findings(data).find(f=>f.regraId==='APROVACAO');
 assert.ok(warning);
 assert.equal(warning.prioridade,'Informativa');
 assert.match(warning.regra,/Manual p\. 4/);
});
test('registros sem indícios não geram relatório e registro com info curta é triagem',()=>{
 const good=row(1,'2026-11','000123',{isEsquecimento:false,informacao:'Relógio eletrônico indisponível'});
 assert.equal(findings([good]).length,0);
 assert.equal(findings([{...good,informacao:'ok'}]).filter(f=>f.regraId==='FUNDAMENTACAO').length,1);
});
