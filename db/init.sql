create table users (
id serial primary key,
first_name varchar,
last_name varchar,
phone_number int,
email varchar,
password varchar
);

create table properties (
property_id serial primary key,
address varchar,
img varchar
)