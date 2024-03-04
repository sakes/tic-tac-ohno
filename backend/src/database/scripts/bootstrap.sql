drop table if exists hello_world;
drop table if exists users;
drop table if exists user_summary;
drop table if exists games;

CREATE TABLE hello_world (
    txt VARCHAR ( 255 )
);

CREATE TABLE users (
    id serial PRIMARY KEY,
    username VARCHAR ( 30 ) UNIQUE NOT null,
    created_date TIMESTAMP NOT NULL default current_timestamp,
    updated_date TIMESTAMP NOT NULL default current_timestamp
);

create table user_summary (
    id serial PRIMARY KEY,
    user_id integer not NULL,
    wins integer not null default 0,
    losses integer not null default 0,
    ties integer not null default 0,
    created_date TIMESTAMP NOT NULL default current_timestamp,
    updated_date TIMESTAMP NOT NULL default current_timestamp
);

create table games (
    id serial PRIMARY KEY,
    owner_user_id integer not NULL,
    opponent_user_id integer,
    board JSONB not null default ('[[0, 0, 0],[0, 0, 0],[0, 0, 0]]'),
    winner_user_id integer,
    completed boolean not null default false,
    created_date TIMESTAMP NOT NULL default current_timestamp,
    updated_date TIMESTAMP NOT NULL default current_timestamp
);
