# Segurança e privacidade

## Natureza dos dados
Planilhas podem conter nomes, matrículas, lotação, gestor e informações sobre afastamentos/abonos. Tratar como dados pessoais e, quando cabível, sensíveis, conforme classificação institucional e LGPD. Manter acesso restrito e respeitar a política de retenção da organização.

## Processamento
Leitura e transformação ocorrem no navegador; não há backend no código entregue. Entretanto, Tailwind, SheetJS, ExcelJS, JSZip, Chart.js, Font Awesome e Google Fonts são carregados de servidores externos. Não afirmar modo offline completo nem garantia absoluta de confidencialidade sem auditoria das dependências.

## Medidas implementadas nesta entrega
- Escapamento de campos de texto originados da planilha nas tabelas, modal e insights principais.
- Toast utiliza `textContent` para não interpretar HTML da mensagem.

## Riscos residuais e recomendações
- HTML monolítico usa scripts e estilos inline: CSP rígida exige refatoração.
- Dependências de terceiros por CDN: recomenda-se auto-hospedagem versionada, CSP e verificações de integridade.
- Conferir todos os pontos de HTML dinâmico em auditoria especializada de XSS.
- Dados de demonstração embutidos no arquivo original: substituir por dados fictícios e não publicar sem verificação.
- Arquivos exportados devem ser tratados como documentos restritos; revisar riscos de fórmula em células importadas antes da distribuição.
- Arquivos muito grandes podem consumir muita memória: implementar limites, worker e validação rigorosa.

Relate incidentes de segurança pelos canais internos autorizados. Não inclua dados pessoais na issue pública.

## Regras obrigatórias para manutenção v2.7.1
- Não transferir planilhas ou dados pessoais importados a APIs ou telemetria de terceiros sem autorização e análise de privacidade.
- Não incluir dados reais em fixtures, logs, screenshots ou repositórios públicos.
- Campos de texto de origem são não confiáveis: proteger inserções em HTML e verificar risco de fórmula em XLSX exportado (não presumir mitigação integral sem teste).
- A exportação por departamento é também uma medida de minimização de divulgação: não permitir empregados ou métricas de outra unidade, inclusive no ZIP. Consultar `docs/EXPORTACOES_E_ISOLAMENTO.md`.
- Verificar a origem, integridade, licença e versões das dependências CDN antes de qualquer atualização.
