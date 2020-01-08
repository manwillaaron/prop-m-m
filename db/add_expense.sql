insert into expenses (amount, store, description, user_id,property_id,receipt_image, date)
values($1,$2,$3,$4,$5,$6,current_timestamp);


select * from expenses
where property_id = $5;