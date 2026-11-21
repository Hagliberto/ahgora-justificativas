# Roadmap sugerido (não implementado)

## P0 — qualidade e segurança
- [ ] Validar colunas essenciais, tipos, datas impossíveis, duplicidades, matrícula vazia, arquivos grandes e planilha vazia.
- [ ] Definir período de competência e contagens de inclusão por empregado **dentro do período**, em vez de toda a base.
- [ ] Homologar as regras de 4 inclusões, 5/7 dias, abono de dia inteiro e escala 12x36 com norma e vigência.
- [ ] Revisar extensivamente HTML dinâmico, conteúdo de células Excel e dependências; substituir dados de demonstração por dados sintéticos.
- [ ] Testes unitários com fixtures fictícias e testes E2E de importação/exportação.

## P1 — experiência de auditoria
- [ ] Competência MM/AAAA e intervalo personalizado.
- [ ] Painel específico por empregado/gestor/unidade com indicadores cruzados.
- [ ] Filtros por gestor, severidade, situação, motivo, período e busca por matrícula; persistência opcional apenas das preferências.
- [ ] Exportação de divergências com trilha da regra acionada, período e versão do motor.
- [ ] Detalhamento da ocorrência com datas, dados originais, regra, evidência e conclusão humana.
- [ ] Diagnóstico de importação: linhas descartadas/invalidas, origem, checksum local, contagens reconciliadas.

## P2 — arquitetura e implantação
- [ ] Separar código em módulos, evitar scripts inline, auto-hospedar dependências e configurar CSP.
- [ ] Otimização de grandes planilhas com Web Worker.
- [ ] PWA/offline apenas depois de empacotar as dependências e avaliar política de proteção de dados.
- [ ] CI de testes, lint e build; documentação de deploy Cloudflare Pages com política de acesso.
- [ ] Integração **opcional** com outros sistemas Ahgora somente com contrato de dados e autorização.
