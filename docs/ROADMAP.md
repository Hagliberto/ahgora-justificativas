# Roadmap — propostas futuras, NÃO implementadas na v2.7.1

## P0: confiabilidade e segurança
- [ ] Testes E2E de navegador com SheetJS/ExcelJS/JSZip reais, incluindo importação de XLSX/XLS/CSV e abertura de cada XLSX do ZIP.
- [ ] Testes de tratamento de fórmulas em textos exportados, arquivos malformados, datas, limites e mensagens de erro.
- [ ] Revisar dados de demonstração para garantir que todos sejam completamente fictícios antes de disponibilizar a aplicação publicamente.
- [ ] Remover Tailwind CDN de produção e compilar CSS em build reproduzível, com regressão visual antes/depois.
- [ ] Homologar interpretação de conflito Norma (24h) e Manual (2 dias úteis) junto ao setor competente.

## P1: qualidade do diagnóstico
- [ ] Diagnóstico por arquivo com rejeições, divergências de cabeçalho, hash e rastreabilidade das fontes.
- [ ] Identificação explícita de motivo oficial de esquecimento, distinguindo validações efetivas de solicitações.
- [ ] Comparação com espelho de ponto, escalas, intervalos e documentos comprobatórios mediante fontes autorizadas.
- [ ] Preservar rótulo de competência consolidada enquanto se oferece **apuração mensal normativa separada**, se homologada.
- [ ] Metadados de exportação: versão do motor, data de geração, fontes e escopo, sem expor dados pessoais desnecessários.

## P2: sustentabilidade
- [ ] Separar progressivamente módulos do `index.html` e construir pipeline de testes/lint/bundle.
- [ ] Hospedar dependências localmente, avaliar CSP, verificação de integridade e proteção de dados.
- [ ] Otimizar processamento de grandes arquivos em Web Worker.
- [ ] Persistência opcional de tratativas do gestor somente com controle de acesso, política de retenção e autorização.
