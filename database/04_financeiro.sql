create table financeiro (
    id uuid primary key default gen-random_uuid(),
    lote_id uuid references lote(id) on delete set null,
    tipo texto not null check (tipo in ('receita', 'despesa')),
    categoria texto not null,
    data_lancamento date not null,
    valor numeric(10,2) not null check (valor > 0),
    descricao text,
    criado_em timestamp not null default now()
);