create table lotes (
    id uuid primary key default gen_random_uuid(),
    nome text not null,
    data_entrada date not null,
    quantidade_inicial integer not null check ( quantidade_inicial > 0 ),
    criando_em timestamptz not null default now()
);