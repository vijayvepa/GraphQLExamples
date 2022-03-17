CREATE SCHEMA azdev;

CREATE TABLE azdev.users (
    id serial PRIMARY KEY ,
    username text NOT NULL UNIQUE ,
    hashed_password text NOT NULL ,
    first_name text,
    last_name text,
    hashed_auth_token text,
    created_at timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc'),
    CHECK ( lower(username) = username )

);

CREATE TABLE azdev.tasks(
    id serial PRIMARY KEY ,
    content text NOT NULL,
    tags text,
    user_id integer NOT NULL ,
    is_private boolean NOT NULL DEFAULT FALSE,
    approach_count integer NOT NULL DEFAULT 0,
    created_at timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc'),
    FOREIGN KEY (user_id) REFERENCES azdev.users
);

CREATE TABLE azdev.approaches (
    id serial PRIMARY KEY ,
    content text NOT NULL ,
    user_id integer NOT NULL ,
    task_id integer NOT NULL ,
    vote_count integer NOT NULL DEFAULT  0,
    created_at timestamp without time zone NOT NULL DEFAULT (now() at time zone 'utc'),

    FOREIGN KEY (user_id) REFERENCES azdev.users,
    FOREIGN KEY (task_id) REFERENCES azdev.tasks

);