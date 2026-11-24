const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
const source = html.slice(html.indexOf('async function exportFilteredRecordsExcel('),html.indexOf('// Exportação com escopo próprio.'));
for (const [fn, sheet] of [['exportFilteredRecordsExcel','Base_Filtrada'],['exportFilteredEmployeesExcel','Analise_Empregados']]) {
  for (const mode of ['download','buffer','empty','failure']) test(`${fn}: ${mode}`, async () => {
    const rows = mode === 'empty' ? [] : [{matricula:'000001'}];
    const calls = [], errors = [], toasts = [];
    const buffer = Buffer.from('mock workbook');
    const ctx = vm.createContext({filteredDataset:rows,getFilteredEmployeesList:()=>rows,currentSourceName:'teste',
      ExcelJS:{Workbook:class { constructor(){this.xlsx={writeBuffer:async()=>buffer};} }},
      getExcelStyleHelpers:()=>({setupStyledSheet:()=>{}}),
      buildBaseTratadaSheet:build,buildRankingEmpregadosSheet:build,
      downloadWorkbook:async(w,name)=>{calls.push(['download',name]); if(mode==='failure') throw Error('simulated');},
      showToast:(...a)=>toasts.push(a),console:{error:e=>errors.push(e)}});
    function build(setup,styles,data,title){assert.equal(data,rows); calls.push(['sheet',title]);}
    vm.runInContext(source,ctx);
    const result = await (mode==='buffer' ? ctx[fn]({returnBuffer:true}) : ctx[fn]());
    if(mode==='empty'){assert.equal(calls.length,0);assert.equal(toasts[0][1],'warning');return;}
    assert.deepEqual(calls[0],['sheet',sheet]);
    if(mode==='buffer'){assert.equal(result,buffer);assert.equal(calls.length,1);assert.equal(toasts.length,0);}
    else {assert.equal(calls[1][0],'download');assert.match(calls[1][1],/\.xlsx$/);assert.equal(toasts[0][1],mode==='failure'?'error':'success');}
    assert.equal(errors.length,mode==='failure'?1:0);
  });
}
