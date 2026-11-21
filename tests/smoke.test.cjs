const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

function extractFunction(name) {
    const start = html.indexOf(`function ${name}(`);
    assert.ok(start >= 0, `Função ${name} existe`);
    const brace = html.indexOf('{', start);
    let depth = 0;
    for (let i = brace; i < html.length; i++) {
        if (html[i] === '{') depth++;
        if (html[i] === '}' && --depth === 0) return html.slice(start, i + 1);
    }
    throw new Error(`Não foi possível extrair ${name}`);
}
// Funções pequenas sem template strings para teste isolado. O teste completo é manual.
const context = vm.createContext({});
for (const name of ['getInclusionClassification', 'parseBrDate', 'formatDateOnly']) {
    vm.runInContext(extractFunction(name), context);
}

test('estrutura mínima da aplicação preservada', () => {
    for (const id of ['analyticsDashboard', 'tabOverview', 'tabRecords', 'tabEmployees', 'tabUnits', 'tabAlerts', 'fileInput']) {
        assert.ok(html.includes(`id="${id}"`), `Elemento ${id}`);
    }
    for (const name of ['processUploadedFiles','processDataset','exportStyledExcel','exportFilteredRecordsExcel','exportFilteredEmployeesExcel','escapeHtml']) {
        assert.ok(html.includes(`function ${name}(`));
    }
});

test('classificação das inclusões mantém limiares originais', () => {
    assert.equal(context.getInclusionClassification(0), 'Regular (0)');
    assert.equal(context.getInclusionClassification(4), 'Dentro do Limite (1 a 4)');
    assert.equal(context.getInclusionClassification(5), 'Reincidente (5 a 6)');
    assert.equal(context.getInclusionClassification(7), 'Crítico (7+)');
});

test('interpreta data brasileira e formata de volta', () => {
    const dt = context.parseBrDate('09/11/2026 15:35');
    assert.equal(context.formatDateOnly(dt), '09/11/2026');
    assert.equal(dt.getHours(), 15);
});

test('toast não interpreta conteúdo dinâmico como HTML', () => {
    assert.match(html, /textNode\.textContent = message/);
});
