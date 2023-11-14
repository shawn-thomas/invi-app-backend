INSERT INTO users (username, password, first_name, last_name, email)
VALUES
  ('john_doe', 'password123', 'John', 'Doe', 'john.doe@example.com'),
  ('jane_smith', 'securepass', 'Jane', 'Smith', 'jane.smith@example.com'),
  ('bob_jackson', 'pass123', 'Bob', 'Jackson', 'bob.jackson@example.com'),
  ('alice_walker', 'alicepass', 'Alice', 'Walker', 'alice.walker@example.com'),
  ('charlie_brown', 'brown123', 'Charlie', 'Brown', 'charlie.brown@example.com');


INSERT INTO customers (username, handle, customer_name, first_name, last_name, email, phone, address)
VALUES
  ('john_doe', 'john_customer', 'John Doe Customer', 'John', 'Doe', 'john.doe.customer@example.com', '123-456-7890', '123 Main St'),
  ('jane_smith', 'jane_customer', 'Jane Smith Customer', 'Jane', 'Smith', 'jane.smith.customer@example.com', '987-654-3210', '456 Oak St'),
  ('bob_jackson', 'bob_customer', 'Bob Jackson Customer', 'Bob', 'Jackson', 'bob.jackson.customer@example.com', '555-123-4567', '789 Pine St'),
  ('alice_walker', 'alice_customer', 'Alice Walker Customer', 'Alice', 'Walker', 'alice.walker.customer@example.com', '111-222-3333', '101 Elm St'),
  ('charlie_brown', 'charlie_customer', 'Charlie Brown Customer', 'Charlie', 'Brown', 'charlie.brown.customer@example.com', '777-888-9999', '222 Birch St'),
  ('john_doe', 'john_customer_2', 'John Doe Customer 2', 'John', 'Doe', 'john.doe.customer2@example.com', '111-222-3333', '321 Elm St'),
  ('jane_smith', 'jane_customer_2', 'Jane Smith Customer 2', 'Jane', 'Smith', 'jane.smith.customer2@example.com', '777-888-9999', '222 Maple St');


INSERT INTO invoices (username, customer_handle, invoice_date, total_amount, status)
VALUES
  ('john_doe', 'john_customer', '2023-01-01', 100.00, 'Paid'),
  ('jane_smith', 'jane_customer', '2023-02-01', 150.50, 'Pending'),
  ('bob_jackson', 'bob_customer', '2023-03-01', 75.25, 'Paid'),
  ('alice_walker', 'alice_customer', '2023-04-01', 200.00, 'Pending'),
  ('charlie_brown', 'charlie_customer', '2023-05-01', 50.75, 'Paid');


INSERT INTO inventory (sku, username, product_name, description, price, quantity_available)
VALUES
  ('SKU001', 'john_doe', 'Product 1', 'Description for Product 1', 25.00, 100),
  ('SKU002', 'jane_smith', 'Product 2', 'Description for Product 2', 30.50, 75),
  ('SKU003', 'bob_jackson', 'Product 3', 'Description for Product 3', 15.75, 50),
  ('SKU001', 'alice_walker', 'Product 4', 'Description for Product 4', 40.00, 200),
  ('SKU002', 'charlie_brown', 'Product 5', 'Description for Product 5', 10.25, 30);


INSERT INTO invoice_items (invoice_id, sku, quantity, unit_price)
VALUES
  (1, 'SKU001', 2, 25.00),
  (2, 'SKU002', 3, 30.50),
  (3, 'SKU003', 1, 15.75),
  (4, 'SKU001', 5, 40.00),
  (5, 'SKU002', 2, 10.25);
