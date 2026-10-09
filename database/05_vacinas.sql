create table vacinas (
  id uuid primary key default gen_random_uuid(),
  lote_id uuid not null references lotes(id) on delete cascade,
  nome_vacina text not null,
  data_aplicacao date not null,
  proxima_dose date,
  observacao text,
  criado_em timestamptz not null default now(),
  check (proxima_dose is null or proxima_dose > data_aplicacao)
);