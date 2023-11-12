INSERT INTO users (username, password, first_name, last_name, email)
VALUES
  ('user1', 'password1', 'John', 'Doe', 'john.doe@example.com'),
  ('user2', 'password2', 'Jane', 'Smith', 'jane.smith@example.com'),
  ('user3', 'password3', 'Bob', 'Johnson', 'bob.johnson@example.com');

INSERT INTO inventory (sku, username, product_name, description, price, quantity_available)
VALUES
  ('SKU001', 'user1', 'Product1', 'Description for Product1', 50.00, 100),
  ('SKU002', 'user2', 'Product2', 'Description for Product2', 75.50, 75),
  ('SKU003', 'user3', 'Product3', 'Description for Product3', 30.25, 50);

INSERT INTO customers (username, customer_name, first_name, last_name, email, phone, address)
VALUES
  ('user1', 'Customer1', 'John', 'Doe', 'john.doe.customer@example.com', '123-456-7890', '123 Main St, City'),
  ('user2', 'Customer2', 'Jane', 'Smith', 'jane.smith.customer@example.com', '987-654-3210', '456 Oak St, Town'),
  ('user3', 'Customer3', 'Bob', 'Johnson', 'bob.johnson.customer@example.com', '555-123-4567', '789 Pine St, Village');

INSERT INTO invoices (username, customer_id, invoice_date, total_amount, status)
VALUES
  ('user1', 1, '2023-01-01', 100.00, 'Paid'),
  ('user2', 2, '2023-02-01', 150.50, 'Pending'),
  ('user3', 3, '2023-03-01', 200.25, 'Processing');

INSERT INTO invoice_items (invoice_id, sku, quantity, unit_price)
VALUES
  (1, 'SKU001', 2, 25.00),
  (2, 'SKU002', 1, 75.50),
  (3, 'SKU003', 3, 10.08);
