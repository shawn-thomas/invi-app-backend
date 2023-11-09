/** Invi Tables */

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(25) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL CHECK (position('@' IN email) > 1)
);

CREATE TABLE customers (
  customer_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id),
  customer_name VARCHAR(100) UNIQUE NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100),
  phone VARCHAR(20),
  address TEXT
);

CREATE TABLE invoices (
  invoice_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id),
  customer_id INT REFERENCES customers(customer_id),
  invoice_date DATE,
  total_amount DECIMAL(15, 2),
  status VARCHAR(20)
);

CREATE TABLE inventory (
  product_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id),
  product_name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(15, 2),
  quantity_available INT
);

CREATE TABLE invoice_items (
  invoice_item_id SERIAL PRIMARY KEY,
  invoice_id INT REFERENCES invoices(invoice_id),
  product_id INT REFERENCES inventory(product_id),
  quantity INT,
  unit_price DECIMAL(15, 2)
);
