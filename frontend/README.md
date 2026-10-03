# frontend

O projeto React, ou seja, as telas que a equipe do galinheiro usa. Feito com React, Vite e Tailwind, pensando primeiro no celular (mobile-first).

## Como rodar

```
npm install
npm run dev
```

Antes de rodar, criar o arquivo `.env` nesta pasta, com a URL e a chave pública do Supabase (os nomes das variáveis estão no README da raiz). O `.env` nunca vai para o GitHub.

## Organização das pastas (dentro de `src`)

| Pasta | O que vai nela |
|---|---|
| `pages/` | Uma página por tela (Login, Início, Lotes, Pesagem, Estoque...) |
| `components/` | Peças reutilizáveis (botão, cartão, campo de formulário) |
| `hooks/` | As buscas de dados e a lógica, como `useLotes` e `useEstoque` |
| `lib/` | A conexão com o Supabase e as funções que leem e gravam no banco |
| `contexts/` | O que o app inteiro precisa saber, como quem está logado |

Regra de ouro: a **tela só mostra e recebe cliques**. A lógica fica nos hooks, e as chamadas ao Supabase ficam em `lib/`.

## Combinados

- **Mobile-first:** pensar a tela no celular primeiro e depois ampliar com `sm:`, `md:` e `lg:`.
- **Nomes:** [definir em dupla: tudo em português ou tudo em inglês, sem misturar].
- **Cálculos importantes** (mortalidade, postura, dias de ração) são conferidos à mão antes de dar a etapa por pronta.
- **Estados da tela:** toda tela que busca dados trata "carregando" e "erro".
- **Uma tarefa por branch**, e Pull Request revisado pelo outro.

## Segurança

- Usar só a chave pública do Supabase aqui. A chave `service_role` nunca entra no front-end.
- Nenhuma chave escrita direto no código: tudo vem do `.env`.
- Conferir no navegador, com dois usuários de teste, que ninguém vê dados que não deveria.

## Observação sobre o README do Vite

Ao criar o projeto com o Vite, ele gera um README próprio nesta pasta. Pode substituir pelo conteúdo deste arquivo, ou juntar os dois.
