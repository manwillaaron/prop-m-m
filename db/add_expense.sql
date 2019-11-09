insert into expenses (amount, store, description, user_id, property_id date)
values($1, $2, $3, $4, $5, current_timestamp);
select * from expenses;