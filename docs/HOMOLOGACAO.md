# Homologação / aceite

Usar **exclusivamente dados fictícios** durante testes automatizados e demonstrações públicas.

- [ ] Abrir a aplicação e carregar as bibliotecas sem erros no console.
- [ ] Importar XLSX, XLS e CSV com colunas válidas; testar arquivo vazio e extensão inválida.
- [ ] Validar matrícula com prefixo alfanumérico e comparação com documento de origem.
- [ ] Conferir datas no mesmo dia, retroativas, antecipadas, virada de mês/ano, data Excel e fuso.
- [ ] Conferir inclusão de batida (0, 1, 4, 5, 6, 7) para cada empregado.
- [ ] Conferir critérios de alerta: >5 e >7 dias, justificativa genérica e indicação de 12x36.
- [ ] Conferir abono `Dia Todo`, intervalos simples, horários noturnos e ausência de horário.
- [ ] Aplicar filtros, limpar filtros, alternar abas, paginar e abrir/fechar modais.
- [ ] Conferir indicadores/gráficos contra totalização independente.
- [ ] Exportar planilha analítica de 7 abas, registros filtrados e ranking por empregado.
- [ ] Testar importação contendo texto literal `<img src=x onerror=alert(1)>` e garantir que ele apareça como texto, sem execução.
- [ ] Testar acessibilidade básica por teclado, mobile e tema claro/escuro.
- [ ] Confirmar formalmente fundamento/competência das regras com RH/jurídico.

**Critério de aceite:** nenhuma mudança não autorizada nos resultados do motor; divergências documentadas em issue e corrigidas antes da publicação.
