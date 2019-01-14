insert into users(
  uid,
  name,
  display_name,
  image_url,
  updated_at
)
values(
  $uid,
  $name,
  $display_name,
  $image_url,
  $updated_at
)
on conflict(uid) do
update set
  name = excluded.name,
  display_name = excluded.display_name,
  image_url = excluded.image_url,
  updated_at = excluded.updated_at;
