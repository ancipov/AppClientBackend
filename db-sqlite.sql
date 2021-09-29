create table users
(
	id INTEGER not null
		constraint users_pk
			primary key autoincrement,
	username TEXT not null,
	password TEXT not null
);

create unique index users_id_uindex
	on users (id);

create unique index users_username_uindex
	on users (username);

create table categories
(
    id INTEGER not null
        constraint categories_pk
            primary key autoincrement,
    name TEXT not null,
    description TEXT,
    userId INTEGER not null
        constraint categories_users_id_fk
            references users
            on update cascade on delete cascade,
    deleted INTEGER default 0 not null,
    updatedAt TEXT default (strftime('%Y-%m-%d %H:%M:%S:%s', 'now', 'localtime'))
);

create unique index categories_id_uindex
    on categories (id);

CREATE TRIGGER update_categories_updateAt  BEFORE update ON categories
begin
    update categories set updatedAt = strftime('%Y-%m-%d %H:%M:%S:%s','now', 'localtime') where id = old.id;
end;

create table notes
(
    id INTEGER not null
        constraint categories_pk
            primary key autoincrement,
    name TEXT not null,
    description TEXT,
    categoryId INTEGER not null
        constraint notes_categories_id_fk
            references categories
            on update cascade on delete cascade,
    userId INTEGER not null
        constraint notes_users_id_fk
            references users
            on update cascade on delete cascade,
    deleted INTEGER default 0 not null,
    updatedAt TEXT default (strftime('%Y-%m-%d %H:%M:%S:%s', 'now', 'localtime'))
);

create unique index notes_id_uindex
    on notes (id);

CREATE TRIGGER update_notes_updateAt  BEFORE update ON notes
begin
    update notes set updatedAt = strftime('%Y-%m-%d %H:%M:%S:%s','now', 'localtime') where id = old.id;
end;
