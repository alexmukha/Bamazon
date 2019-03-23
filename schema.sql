DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone X", "Mobile", 1000, 500);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Charging Cable", "Electroincs", 3, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone X Case", "Mobile", 50, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Screen Protector", "Mobile", 10, 70);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Phone Holder", "Automotive", 45, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bluetooth Headset", "Media", 55, 150);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Calculator", "Office", 9, 80);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pens", "Office", 10, 1000);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Leather Chair", "Furniture", 235, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wall USB", "Electronics", 5, 0);
