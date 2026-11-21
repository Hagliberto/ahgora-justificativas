# Regras de negócio — implementação 2.1.0

**Escopo:** ferramenta de triagem administrativa. Não conclui irregularidade, sanção, ausência indevida ou violação do ACT.

| ID | Regra em produção | Base/ressalva |
|---|---|---|
| R01 | Competência pelo mês/ano da **data da justificativa (ocorrência)**; padrão é o mês mais recente do arquivo | Quando escolhida a opção “Todas”, totais não representam uma competência única |
| R02 | Totaliza todas as inclusões como volume informativo | Não confundir com esquecimento; o art. 7º §3º é específico |
| R03 | Identifica possíveis esquecimentos por expressões como “esqueci”, “esquecimento”, “esqueceu” | Triagem heurística textual; requer conferência do motivo no Ahgora |
| R04 | Mais de quatro possíveis esquecimentos identificados no mês sinaliza conferência | Norma NN.DD.P.A.06.0008.05 art. 7º §3º–4º; não sinaliza em “Todas” |
| R05 | Solicitação posterior à ocorrência sinaliza para análise contextual | Norma art. 12 contempla exceções; não é violação automática |
| R06 | Aprovação com intervalo superior a 24h após solicitação sinaliza conferência | Norma art. 12 e Manual p. 4 divergem; não há verificação de 2 dias úteis automática |
| R07 | Texto genérico/curto gera atenção | Heurística gerencial não prevista explicitamente na Norma |
| R08 | Referência textual à escala 12x36 sem indicação na localização gera atenção | Não confirma escala real do empregado |
| R09 | Rejeita ausência de campos essenciais de importação | Campos: Data solicitação, Data da justificativa, Matrícula, Funcionário, Tipo e Status |
| R10 | Matrícula sem algarismos fica vazia, e chave interna usa identificador isolado | Evita agrupamento artificial de todos em 000000 |
| R11 | Datas BR/ISO são verificadas quanto a dia/mês impossível | Registros sem datas válidas são sinalizados |

**Não implementado:** prazo jurídico definitivo de solicitações de ausência previsível, feriados/dias úteis, anexos comprobatórios, assinatura mensal, validação efetiva do motivo “esquecimento”, interjornada e intrajornada (necessitam espelho de ponto), regras do ACT não fornecido nesta entrega.
