# Homologação e regressão — v2.7.1

Este roteiro separa **testes automatizados estáticos/isolados** de **homologação real no navegador**. `npm test` não substitui testes da geração binária e da interface.

## Comandos automatizados
```powershell
npm run check
# Opcional, teste direcionado mais crítico:
node --test tests/isolamento-exportacao.test.cjs
```
Use Node >=20. Verifique `git diff --check`. Um editor/agente que altere scripts inline deve executar `node --check` no script JS extraído, não no HTML completo.

## Casos obrigatórios para qualquer release
- [ ] **Importação múltipla**: XLSX + CSV com sobreposição de linhas; conferir arquivos válidos/ignorados, duplicidades exatas e contagem final; reimportar o mesmo arquivo.
- [ ] **Competência única**: ocorrências em meses civis diferentes devem permanecer juntas no ranking consolidado. Não sinalizar automaticamente como infração o total 5+ da competência.
- [ ] **Semântica de esquecimentos**: inclusão simples ≠ texto de esquecimento; testar `esqueci`, `esquecimento` e problemas técnicos diferentes.
- [ ] **Filtros globais**: alternar unidade, empregado, gestor, períodos e status; checar todos cards/gráficos e reset.
- [ ] **Rotas**: `#/dashboard`, `#/base`, `#/empregados`, `#/unidades`, `#/alertas`, `#/inconformidades`; fluxo unidade→empregados→ficha; Voltar/Avançar.
- [ ] **DOM**: nenhuma exceção `Cannot set properties of null`, inclusive depois de importar e trocar abas; mensagens de arquivo não devem mascarar falha de renderização.
- [ ] **Inconformidades**: achados com evidência, regra, escopo e ressalva humana; testar excesso textual e divergência documental 24h/2 dias úteis.
- [ ] **Completa**: gerar XLSX, conferir as oito abas, métricas, filtros de cabeçalho, cores, larguras e total de registros.
- [ ] **Por unidade**: exportar só A, só B e A+B; cruzar totais de TODAS as abas com base original.
- [ ] **ZIP**: abrir ZIP e dois arquivos XLSX distintos; `Ranking_Empregados` e `Base_Tratada` não podem conter contadores, empregados ou unidades estranhos.
- [ ] **Mesmo empregado em duas unidades**: separar corretamente contadores por departamento na exportação.
- [ ] **Privacidade**: não transmitir dados importados, não armazenar PII em logs e não inserir entradas perigosas sem proteção.
- [ ] **Excel para Web no SharePoint**: testar cores, bordas, filtros, congelamento, números e datas em arquivo real, se necessário.

## Validação com dados fictícios
Construir pelo menos 2 departamentos (A e B) com empregados fictícios; inserir mesma matrícula em ambos, duplicidade exata entre duas fontes, uma inclusão sem esquecimento, cinco indícios de esquecimento espalhados por mais de um mês e decisões em mais de 24h. Usar testes de regressão de exportação, não dados funcionais de produção.

## Critério de entrega
Relatório com: versão, arquivos alterados, testes executados e resultados, evidências de navegador e Excel/ZIP (quando realizadas), pendências e aprovação do responsável. Não declarar 'homologado' sem execução comprovada da etapa correspondente.
