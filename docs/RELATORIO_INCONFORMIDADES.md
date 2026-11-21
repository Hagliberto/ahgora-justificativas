# Relatório de Inconformidades para Gestores — versão 2.5.0

## Fontes primárias

- **Norma de Controle de Jornada CAERN NN.DD.P.A.06.0008.05**, de 31/12/2024, especialmente art. 2º, II, art. 7º §§ 2º a 4º (página 3 do PDF), art. 12, caput e §§ 1º–2º (página 5).
- **Manual da Norma de Controle de Jornada**, páginas numeradas 4 e 6 (páginas 5 e 7 do PDF): gestor analisa em até 2 dias úteis, limite de 4 ocorrências com motivo “ESQUECI DE BATER PONTO”.

## Semântica e limites

Cada linha do relatório é **um indício para conferência**, não uma irregularidade comprovada. Múltiplos indícios podem nascer de um mesmo registro. Os textos de evidência são derivados da importação, não de prova externa. O mesmo empregado pode ter entradas para competências diferentes.

- **ESQUECIMENTO**: apenas inclusões cujo texto contenha indício de esquecimento; agrupa matrícula + competência e cria **uma ocorrência consolidada por mês** quando a contagem supera quatro. O limite normativo se refere às **validações** de ponto por esquecimento; confirma-se na origem, inclusive o motivo oficial. Não são somadas genericamente todas as inclusões.
- **PRAZO_SOL**: solicitação posterior ao fato exige verificação do art. 12, que traz hipóteses de previsibilidade/imprevisibilidade e exceções; não basta estar posterior para configurar infração.
- **APROVACAO**: acima de 24 horas corridas é indicador **informativo**, pois a Norma art. 12 indica 24h e o Manual p. 4, dois dias úteis. A regra prevalecente depende da validação institucional; não existe condenação automática do gestor.
- **FUNDAMENTACAO**: textos genéricos são evidência insuficiente e demandam apuração; não se presume falsidade.
- **ESCALA**: comparação textual preliminar, sem acesso à escala oficial.
- **DADOS**: data ausente/inválida ou inversão cronológica é problema de qualidade da origem.

## Funcionamento

Rota: `#/inconformidades`. Usa os filtros globais e os filtros da base; oferece filtros internos próprios de unidade, assunto, prioridade e pesquisa textual. Botões abrem ficha do empregado e detalhamento do registro.

Exportação pelo botão da aba: `.xlsx` com as ocorrências **visíveis após filtros**, mais coluna vazia de análise humana. A exportação analítica completa ou por uma/múltiplas unidades contém **8 abas**, incluindo `Inconformidades`, calculada com o escopo escolhido. Não há persistência de comentários ou decisões do gestor.

## Recomendações para homologação

1. Testar empregado com quatro e cinco esquecimentos no mesmo mês e ocorrências de outros meses, incluindo inclusões de batida que não sejam esquecimento.
2. Testar dois empregados com nomes iguais e matrículas diferentes.
3. Testar prazos de aprovação maiores que 24h e verificar ressalva normativa.
4. Confirmar filtragem por unidade, competência, empregado, gestor e prioridade e exportações no escopo correspondente.
5. Confirmar que cada registro abre modal correto; verificar proteção de texto importado e Excel.
6. Verificar o resultado com planilhas oficiais e aprovação do Núcleo de Pessoal antes de uso decisório.
