alter table lotes enable row level security;
alter table ovos force row level security;
alter table racao force row level security;
alter table financeiro force row level security;
alter table vacinas force row level security;
alter table mortalidade force row level security;

create policy "autenticados acessan lotes" on lotes for all to authenticated using (true) winth check (true);
create policy "autenticados acessan ovos" on ovos for all to authenticated using (true) winth check (true);
create policy "autenticados acessan racao" on racao for all to authenticated using (true) winth check (true);
create policy "autenticados acessan financeiro" on financeiro for all to authenticated using (true) winth check (true);
create policy "autenticados acessan vacinas" on vacinas for all to authenticated using (true) winth check (true);
create policy "autenticados acessan mortalidade" on mortalidade for all to authenticated using (true) winth check (true);
   