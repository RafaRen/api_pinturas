--Configuracion para usuario en NODE.JS
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'

DROP DATABASE database_pinturas

create database database_pinturas
USE database_pinturas


CREATE TABLE users(
    _id BIGINT NOT NULL ,
    email VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(60) NOT NULL,
    phone VARCHAR(50) ,
    address VARCHAR(100) 
)

ALTER TABLE users 
    ADD PRIMARY KEY (_id);
    
ALTER TABLE users
  MODIFY _id BIGINT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

    DESCRIBE users
    

-- categories

CREATE TABLE categories
(
    _id BIGINT NOT NULL,
    name VARCHAR(50) NOT NULL,
    description varchar(255) 
);

ALTER TABLE categories
  ADD PRIMARY KEY (_id);

ALTER TABLE categories
  MODIFY _id BIGINT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE categories;

-- Product Tables

CREATE TABLE products
(
    _id BIGINT NOT NULL,
    name VARCHAR(50) NOT NULL,
    price VARCHAR(20) NOT NULL,
    description VARCHAR(100),
    image VARCHAR(255) ,
    state INTEGER ,
    idCategory BIGINT NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT FkCategory FOREIGN KEY(idCategory) REFERENCES categories(_id)
);

ALTER TABLE products
  ADD PRIMARY KEY (_id);

ALTER TABLE products
  MODIFY _id BIGINT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE products;

-- Orders

CREATE TABLE orders
(
    _id BIGINT NOT NULL,
    total float NOT NULL,
    state INTEGER NOT NULL,
    idUser BIGINT NOT NULL,
    idProduct BIGINT NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT FkUser FOREIGN KEY(idUser) REFERENCES users(_id),
    CONSTRAINT FkProduct FOREIGN KEY(idProduct) REFERENCES products(_id)
);

ALTER TABLE orders
  ADD PRIMARY KEY (_id);

ALTER TABLE orders
  MODIFY _id BIGINT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE orders;



-- Order_detail

CREATE TABLE order_detail
(
    _id BIGINT NOT NULL,
    priceUnit float NOT NULL,
    amount INTEGER NOT NULL,
    idOrder BIGINT NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT FkOrderDetail FOREIGN KEY(idOrder) REFERENCES orders(_id)
);

ALTER TABLE order_detail 
    ADD PRIMARY KEY (_id);

ALTER TABLE order_detail
  MODIFY _id BIGINT NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;


DESCRIBE order_detail;



