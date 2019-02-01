insert into users(
  uid,
  name,
  updated_at
)
values(
  $uid,
  $name,
  $updated_at
)
on conflict(uid) do
update set
  name = excluded.name,
  updated_at = excluded.updated_at;
