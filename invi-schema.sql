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
  handle VARCHAR(100),
  customer_name VARCHAR(100) NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(50),
  phone VARCHAR(20),
  address TEXT,
  CONSTRAINT unique_handle_per_user UNIQUE (username, handle)
);

CREATE TABLE invoices (
  invoice_id VARCHAR(20),
  username VARCHAR(25),
  PRIMARY KEY (invoice_id, username),
  customer_handle VARCHAR(100),
  invoice_date DATE,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(15, 2),
  status VARCHAR(20),
  CONSTRAINT fk_invoice_customer FOREIGN KEY (username, customer_handle) REFERENCES customers(username, handle) ON DELETE CASCADE
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
  item_id SERIAL PRIMARY KEY,
  invoice_id INT,
  username VARCHAR(25),
  sku VARCHAR(25),
  quantity INT,
  unit_price DECIMAL(15, 2) CHECK (unit_price >= 0),
  CONSTRAINT fk_invoice_items FOREIGN KEY (invoice_id, username) REFERENCES invoices(invoice_id, username) ON DELETE CASCADE
);