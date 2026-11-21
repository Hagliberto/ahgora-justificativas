const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
function slice(start,end){const a=html.indexOf(start);const b=html.indexOf(end,a+start.length);assert.ok(a>0&&b>a);return html.slice(a,b);}
test('múltiplos arquivos podem ser escolhidos e adicionados depois',()=>{
 assert.match(html,/id="fileInput"[^>]+multiple/);
 assert.match(html,/processUploadedFiles\(e\.dataTransfer\.files\)/);
 assert.match(html,/function resetImportedFiles\(\)/);
 assert.match(html,/function renderImportedSources\(\)/);
});
test('deduplicação de linhas exatas entre arquivos e preservação de linhas diferentes',()=>{
 const src = slice('function importedRowKey(row)','function renderImportedSources()');
 const ctx=vm.createContext({EXPECTED_COLUMNS:['Matrícula','Data da justificativa','Tipo','Informação']});
 vm.runInContext(src,ctx);
 const one={'Matrícula':'001','Data da justificativa':'01/10/2026','Tipo':'Inclusão de batida','Informação':'Esqueci'};
 const different={...one,'Informação':'Falha biométrica'};
 const out=ctx.mergeImportedRows([{rows:[one,different]},{rows:[{...one}]}]);
 assert.equal(out.rows.length,2);
 assert.equal(out.duplicates,1);
});
test('ranking soma esquecimentos de meses diferentes na mesma competência',()=>{
 const src = slice('function forgottenRankingRows(records)','function renderForgottenRanking(records)');
 const ctx=vm.createContext({});vm.runInContext(src,ctx);
 const rows=[{matricula:'001',funcionario:'Pessoa 1',deptNome:'A',isInclusao:true,isEsquecimento:true,dataJustificativaIso:'2026-10-01'},
 {matricula:'001',funcionario:'Pessoa 1',deptNome:'A',isInclusao:true,isEsquecimento:true,dataJustificativaIso:'2026-11-15'},
 {matricula:'002',funcionario:'Pessoa 2',deptNome:'A',isInclusao:true,isEsquecimento:false,dataJustificativaIso:'2026-11-15'}];
 const ranking=ctx.forgottenRankingRows(rows);
 assert.equal(ranking.length,2);
 assert.equal(ranking[0].esquecimentos,2);
 assert.equal(ranking[0].inclusoes,2);
 assert.equal(ranking[1].esquecimentos,1);
 assert.equal(ranking[1].identificados,0);
});
test('competência consolidada não provoca filtro por data da justificativa',()=>{
 assert.match(html,/const scopedRows = rows;/);
 assert.doesNotMatch(html,/rows\.filter\(r => getCompetence\(r\['Data da justificativa'\]\)/);
});
