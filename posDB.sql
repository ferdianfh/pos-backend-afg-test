create database pos_afg_testdb;


create table products (
    product_id VARCHAR(64) NOT NULL,
    category_id VARCHAR(64) NOT NULL,
    product_name VARCHAR(64) NOT NULL,
    product_image VARCHAR(128) NOT NULL,
    product_description TEXT,
    product_price INT NOT NULL DEFAULT 0,
    product_stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    PRIMARY KEY(product_id),
    CONSTRAINT fk_product_category
        FOREIGN KEY (category_id) REFERENCES categories(category_id)
            ON DELETE CASCADE ON UPDATE CASCADE
);

create table categories (
    category_id VARCHAR(64) NOT NULL,
    category_name VARCHAR(64) NOT NULL,
    category_image VARCHAR(128) NOT NULL,
    total_product_per_category INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    PRIMARY KEY(category_id)
);

ALTER TABLE categories MODIFY category_image VARCHAR(128);

INSERT INTO categories(category_id, category_name)
VALUES ('makanan', 'Makanan'),
        ('minuman', 'Minuman'),
        ('pakaian', 'Pakaian'),
        ('elektronik', 'Elektronik');