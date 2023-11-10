-- Customers Table Seed Data

-- users
INSERT INTO users (username, password, first_name, last_name, email)
VALUES
  ('user1', 'password1', 'John', 'Doe', 'john.doe@email.com'),
  ('user2', 'password2', 'Jane', 'Smith', 'jane.smith@email.com'),
  ('user3', 'password3', 'Bob', 'Johnson', 'bob.johnson@email.com'),
  ('user4', 'password4', 'Alice', 'Williams', 'alice.williams@email.com'),
  ('user5', 'password5', 'Charlie', 'Brown', 'charlie.brown@email.com'),
  ('user6', 'password6', 'Eva', 'Miller', 'eva.miller@email.com'),
  ('user7', 'password7', 'Frank', 'Wilson', 'frank.wilson@email.com'),
  ('user8', 'password8', 'Grace', 'Davis', 'grace.davis@email.com'),
  ('user9', 'password9', 'Henry', 'Moore', 'henry.moore@email.com'),
  ('user10', 'password10', 'Isabel', 'Jones', 'isabel.jones@email.com');

-- customers
INSERT INTO customers (customer_id, username, customer_name, first_name, last_name, email, phone, address)
VALUES
  (1, 'user1', 'Customer A', 'John', 'Doe', 'john.doe.customer@email.com', '123-456-7890', '123 Main St'),
  (2, 'user2', 'Customer B', 'Jane', 'Smith', 'jane.smith.customer@email.com', '987-654-3210', '456 Oak St'),
  (3, 'user3', 'Customer C', 'Bob', 'Johnson', 'bob.johnson.customer@email.com', '111-222-3333', '789 Pine St'),
  (4, 'user4', 'Customer D', 'Alice', 'Williams', 'alice.williams.customer@email.com', '555-666-7777', '101 Elm St'),
  (5, 'user5', 'Customer E', 'Charlie', 'Brown', 'charlie.brown.customer@email.com', '999-888-7777', '202 Cedar St'),
  (6, 'user6', 'Customer F', 'Eva', 'Miller', 'eva.miller.customer@email.com', '444-333-2222', '303 Birch St'),
  (7, 'user7', 'Customer G', 'Frank', 'Wilson', 'frank.wilson.customer@email.com', '777-888-9999', '404 Maple St'),
  (8, 'user8', 'Customer H', 'Grace', 'Davis', 'grace.davis.customer@email.com', '123-123-1234', '505 Pine St'),
  (9, 'user9', 'Customer I', 'Henry', 'Moore', 'henry.moore.customer@email.com', '456-789-0123', '606 Oak St'),
  (10, 'user10', 'Customer J', 'Isabel', 'Jones', 'isabel.jones.customer@email.com', '987-654-3210', '707 Main St');

-- invoices
INSERT INTO invoices (invoice_id, username, customer_id, invoice_date, total_amount, status)
VALUES
  (1, 'user1', 1, '2023-01-01', 100.00, 'Paid'),
  (2, 'user2', 2, '2023-02-01', 150.00, 'Pending'),
  (3, 'user3', 3, '2023-03-01', 200.00, 'Paid'),
  (4, 'user4', 4, '2023-04-01', 75.00, 'Paid'),
  (5, 'user5', 5, '2023-05-01', 120.00, 'Pending'),
  (6, 'user6', 6, '2023-06-01', 180.00, 'Pending'),
  (7, 'user7', 7, '2023-07-01', 90.00, 'Paid'),
  (8, 'user8', 8, '2023-08-01', 220.00, 'Paid'),
  (9, 'user9', 9, '2023-09-01', 130.00, 'Pending'),
  (10, 'user10', 10, '2023-10-01', 160.00, 'Pending');

-- inventory
INSERT INTO inventory (sku, username, product_name, description, price, quantity_available)
VALUES
  ('SKU001', 'user1', 'Product A', 'Description A', 25.00, 50),
  ('SKU002', 'user2', 'Product B', 'Description B', 35.00, 30),
  ('SKU003', 'user3', 'Product C', 'Description C', 40.00, 20),
  ('SKU004', 'user4', 'Product D', 'Description D', 15.00, 75),
  ('SKU005', 'user5', 'Product E', 'Description E', 30.00, 40),
  ('SKU006', 'user6', 'Product F', 'Description F', 45.00, 25),
  ('SKU007', 'user7', 'Product G', 'Description G', 22.00, 60),
  ('SKU008', 'user8', 'Product H', 'Description H', 50.00, 15),
  ('SKU009', 'user9', 'Product I', 'Description I', 28.00, 45),
  ('SKU010', 'user10', 'Product J', 'Description J', 33.00, 35);

-- invoice_items
INSERT INTO invoice_items (invoice_item_id, invoice_id, sku, quantity, unit_price)
VALUES
  (1, 1, 'SKU001', 5, 25.00),
  (2, 2, 'SKU002', 3, 35.00),
  (3, 3, 'SKU003', 2, 40.00),
  (4, 4, 'SKU004', 8, 15.00),
  (5, 5, 'SKU005', 4, 30.00),
  (6, 6, 'SKU006', 6, 45.00),
  (7, 7, 'SKU007', 7, 22.00),
  (8, 8, 'SKU008', 10, 50.00),
  (9, 9, 'SKU009', 4, 28.00),
  (10, 10, 'SKU010', 5, 33.00);
