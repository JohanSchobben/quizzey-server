CREATE table users (
    id bigint primary key  auto_increment,
    username varchar(255) unique not null,
    email varchar(255) unique not null,
    password varchar(255) not null
);