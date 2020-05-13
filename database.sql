create database productmanager;

drop table if exists products;

create table if not exists products (
    id serial primary key,
    name varchar(25),
    price integer,
    img text
);

insert into products
    (name, price, img)
values
    ('shirt 1', 30, 'https://res.cloudinary.com/kvge/image/upload/c_scale,w_800/v1525285958/Small-Logo-Front-Mock-Up-Black.png'),
    ('shirt 2', 30, 'https://res.cloudinary.com/kvge/image/upload/c_scale,w_800/v1525285957/Small-Logo-Front-Mock-Up.png'),
    ('shirt 3', 35, 'https://res.cloudinary.com/kvge/image/upload/c_scale,w_800/v1525285983/F_F-Tiff-On-Black-Front.png'),
    ('shirt 4', 35, 'https://res.cloudinary.com/kvge/image/upload/c_scale,w_800/v1525285985/F_F-Mint-On-White-Front.png');