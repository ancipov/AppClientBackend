create table Users
(
    id int identity,
    username varchar(255) not null,
    password varchar(255)
)
go

create unique index Users__id_uindex
    on Users (_id)
go

create unique index Users_username_uindex
    on Users (username)
go

alter table Users
    add constraint Users_pk
        primary key nonclustered (_id)
go

CREATE TABLE Categories
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    name VARCHAR(100),
    description VARCHAR(100),
    deleted BIT,
    _updatedAt DATETIME DEFAULT getdate()
);

go

CREATE UNIQUE INDEX Categories_id_uindex ON Categories (id);

go

CREATE TRIGGER update_Categories_updatedAt  ON Categories
    AFTER UPDATE
    AS
    UPDATE f set _updatedAt=GETDATE()
    FROM
        Categories AS f
            INNER JOIN inserted
            AS i
                       ON f.id = i.id;
go

alter table Categories
    add userId int
go

alter table Categories
    add constraint Categories_Users_id_fk
        foreign key (userId) references Users
            on update cascade on delete cascade
go

CREATE TABLE Notes
(
    id INT PRIMARY KEY NOT NULL IDENTITY,
    content VARCHAR(100),
    deleted BIT,
    updatedAt DATETIME DEFAULT getdate()
);

go

CREATE UNIQUE INDEX Notes_id_uindex ON Notes (id);

go

CREATE TRIGGER update_Notes_updatedAt  ON Notes
AFTER UPDATE
AS
  UPDATE f set updatedAt=GETDATE()
  FROM
    Notes AS f
    INNER JOIN inserted
    AS i
      ON f.id = i.id;
go

alter table Notes
    add userId int
go

alter table Notes
    add constraint Notes_Users_id_fk
        foreign key (userId) references Users
            on update cascade on delete no action
go

alter table Notes
    add categoryId int
go

alter table Notes
    add constraint Notes_Categories_id_fk
        foreign key (categoryId) references Categories
            on update no action on delete cascade
go


