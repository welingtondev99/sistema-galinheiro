create table mortalidade (
  id uuid primary key default gen_random_uuid(),
  lote_id uuid not null references lotes(id) on delete cascade,
  data_ocorrencia date not null,
  quantidade integer not null check (quantidade > 0),
  causa text,
  criado_em timestamptz not null default now()
);