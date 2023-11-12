-- Customers Table Seed Data

-- Users
INSERT INTO users (username, password, first_name, last_name, email) VALUES
('john_doe', 'password123', 'John', 'Doe', 'john.doe@example.com'),
('alice_smith', 'pass456', 'Alice', 'Smith', 'alice.smith@example.com'),
('bob_jones', 'secure789', 'Bob', 'Jones', 'bob.jones@example.com');

-- Customers
INSERT INTO customers (username, customer_name, first_name, last_name, email, phone, address) VALUES
('john_doe', 'ABC Corp', 'John', 'Doe', 'abc.corp@example.com', '123-456-7890', '123 Main St'),
('alice_smith', 'XYZ Ltd', 'Alice', 'Smith', 'xyz.ltd@example.com', '987-654-3210', '456 Oak Ave'),
('bob_jones', '123 Enterprises', 'Bob', 'Jones', '123.enterprises@example.com', '555-123-4567', '789 Pine Blvd');

-- Invoices
INSERT INTO invoices (username, customer_id, invoice_date, total_amount, status) VALUES
('john_doe', 1, '2023-01-15', 500.00, 'Paid'),
('alice_smith', 2, '2023-02-20', 800.00, 'Pending'),
('bob_jones', 3, '2023-03-10', 1200.00, 'Processing');

-- Inventory
INSERT INTO inventory (sku, username, product_name, description, price, quantity_available) VALUES
('SKU001', 'john_doe', 'Widget A', 'High-quality widget', 19.99, 100),
('SKU002', 'alice_smith', 'Gadget B', 'Feature-rich gadget', 29.99, 50),
('SKU003', 'bob_jones', 'Tool C', 'Durable tool for various tasks', 49.99, 75);

-- Invoice Items
INSERT INTO invoice_items (invoice_id, sku, quantity, unit_price) VALUES
(1, 'SKU001', 2, 19.99),
(2, 'SKU002', 1, 29.99),
(3, 'SKU003', 3, 49.99);
