/** Invi Tables */

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL CHECK (position('@' IN email) > 1)
);

CREATE TABLE customers (
  customer_id SERIAL PRIMARY KEY,
  username VARCHAR(25) REFERENCES users(username) ON DELETE CASCADE,
  customer_name VARCHAR(100) UNIQUE NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100),
  phone VARCHAR(20),
  address TEXT
);

CREATE TABLE invoices (
  invoice_id SERIAL PRIMARY KEY,
  username VARCHAR(25) REFERENCES users(username) ON DELETE CASCADE,
  customer_id INT REFERENCES customers(customer_id) ON DELETE CASCADE,
  invoice_date DATE,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(15, 2),
  status VARCHAR(20)
);

CREATE TABLE inventory (
  inventory_id SERIAL PRIMARY KEY,
  sku VARCHAR(25) NOT NULL,
  username VARCHAR(25) REFERENCES users(username) ON DELETE CASCADE,
  product_name VARCHAR(50) NOT NULL,
  description TEXT,
  price DECIMAL(15, 2),
  quantity_available INT
);

CREATE TABLE invoice_items (
  invoice_item_id SERIAL PRIMARY KEY,
  invoice_id INT REFERENCES invoices(invoice_id) ON DELETE CASCADE,
  sku VARCHAR(25),
  quantity INT,
  unit_price DECIMAL(15, 2) CHECK (unit_price >= 0)
);