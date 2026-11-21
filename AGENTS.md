# AGENTS — Diretrizes do projeto

1. Preservar os nomes das 13 colunas de origem e a sequência de normalização, agregação, auditoria, renderização e exportação até haver testes de regressão.
2. Alterações em regras (limites, datas, classificação e escala) exigem fonte normativa, período de vigência, casos de teste e atualização de `docs/REGRAS_DE_NEGOCIO.md`.
3. Não inserir dados pessoais reais em fixtures, logs, capturas de tela, issues ou commits. Preferir exemplos inteiramente fictícios.
4. Nunca interpolar texto vindo da planilha diretamente em `innerHTML`: usar `escapeHtml()` ou `textContent`. Não escapar o dado original antes das exportações.
5. Não adicionar dependências por CDN sem revisar licença, versão, integridade e política de segurança.
6. Manter visual responsivo WIDE, tema claro como padrão, acessibilidade por teclado e funcionamento sem servidor de aplicação.
7. Executar `npm run check` e conferir manualmente importação real/sintética, todas as abas e os três modelos de exportação.
8. Atualizar `CHANGELOG.md`, `README.md`, testes e versão visível ao lançar correções; commits no padrão `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`.
9. Não executar git push, deploy, exclusão ou migração destrutiva sem autorização explícita.
10. **Atenção**: dados de demonstração incorporados ao HTML recebido possuem nomes com aparência real; validar sua natureza e substituí-los por exemplos fictícios antes de publicação pública.
