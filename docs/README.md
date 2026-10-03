# docs

Documentação do projeto: o que foi decidido, como o sistema está organizado e o que ainda precisa ser respondido.

## O que guardar aqui

| Arquivo sugerido | Para quê |
|---|---|
| `decisoes.md` | Registro de cada escolha importante, com a data e o motivo |
| `desenho-do-sistema.md` | Como as peças se encaixam (React, Supabase, Python) e o que acontece se algo falhar |
| `modelo-do-banco.md` | Lista das tabelas, campos e ligações (ou o diagrama) |
| `perguntas-cliente.md` | Dúvidas para tirar com o cliente e as respostas |
| `etapas.md` | Andamento das etapas, com o que foi feito e o que falta |

## Como escrever o registro de decisões

Uma linha por decisão, sempre com o motivo:

```
01/10/2026 - Tabelas criadas com SQL, arquivos guardados no Git.
Motivo: fica registrado e pode ser repetido em outro ambiente.
```

## Regras

- Escrever em Markdown (`.md`), em frases curtas.
- Atualizar ao fim de cada etapa. Documento desatualizado atrapalha mais do que ajuda.
- Não colocar aqui chaves, senhas nem dados reais do cliente.
- Antes de mudar algo combinado (tabela, regra de cálculo), registrar a mudança e avisar o outro.
