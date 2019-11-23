insert into expenses (amount, store, description, user_id, date)
values($1, $2, $3, $4, current_timestamp)
returning *;
