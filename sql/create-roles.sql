CREATE table roles (
                       id bigint primary key  auto_increment,
                       role varchar(255) unique not null
);

CREATE table users_roles (
    user_id bigint,
    role_id bigint,
    primary key (user_id, role_id),
    foreign key (user_id) references users(id),
    foreign key (role_id) references roles(id)
)