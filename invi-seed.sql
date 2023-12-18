INSERT INTO users (username, password, first_name, last_name, email)
VALUES
  ('user1', 'password1', 'John', 'Doe', 'john.doe@example.com'),
  ('user2', 'password2', 'Jane', 'Smith', 'jane.smith@example.com'),
  ('user3', 'password3', 'Alice', 'Johnson', 'alice.johnson@example.com'),
  ('user4', 'password4', 'Bob', 'Williams', 'bob.williams@example.com'),
  ('user5', 'password5', 'Eva', 'Jones', 'eva.jones@example.com'),
  ('demo', '$2b$12$E05h1i2.wU2TW9BoVoY6YOedavwSjwiOXij7SU.Gt2VtawY8/yLyO', 'Demo', 'User', 'demo.user@example.com');


INSERT INTO customers (username, handle, customer_name, first_name, last_name, email, phone, address)
VALUES
  ('user1', 'cust1', 'Customer One', 'John', 'Doe', 'customer.one@example.com', '+123456789', '123 Main St'),
  ('user2', 'cust2', 'Customer Two', 'Jane', 'Smith', 'customer.two@example.com', '+987654321', '456 Oak Ave'),
  ('user3', 'cust3', 'Customer Three', 'Alice', 'Johnson', 'customer.three@example.com', '+111223344', '789 Maple St'),
  ('user4', 'cust4', 'Customer Four', 'Bob', 'Williams', 'customer.four@example.com', '+555666777', '321 Elm St'),
  ('user5', 'cust5', 'Customer Five', 'Eva', 'Jones', 'customer.five@example.com', '+999888777', '567 Pine St'),
  ('demo', 'swift-freight', 'Swift Freight Solutions', 'John', 'Samson', 'john@swiftfreight.com', '(416) 630-7782', '123 Main St'),
  ('demo', 'eco-transit-logistics', 'Eco Transit Logistics', 'Alice', 'Green', 'alice@ecotransit.com', '(555) 123-4567', '456 Oak Ave'),
  ('demo', 'tech-logistics-express', 'Tech Logistics Express', 'Bob', 'Techie', 'bob@techexpress.com', '(123) 456-7890', '789 Maple St'),
  ('demo', 'green-route-shippers', 'Green Route Shippers', 'Eva', 'Eco', 'eva@greenrouteshippers.com', '(987) 654-3210', '321 Elm St'),
  ('demo', 'bookworm-freight', 'Bookworm Freight Services', 'Jane', 'Reader', 'jane@bookwormfreight.com', '(111) 222-3333', '567 Pine St');

INSERT INTO invoices (invoice_id, username, customer_handle, invoice_date, total_amount, status)
VALUES
  ('101', 'user1', 'cust1', '2023-01-01', 150.00, 'Paid'),
  ('102', 'user2', 'cust2', '2023-01-02', 200.00, 'Pending'),
  ('103', 'user3', 'cust3', '2023-01-03', 100.00, 'Paid'),
  ('104', 'user4', 'cust4', '2023-01-04', 120.00, 'Pending'),
  ('105', 'user5', 'cust5', '2023-01-05', 180.00, 'Paid');


INSERT INTO inventory (sku, username, product_name, description, price, quantity_available)
VALUES
  ('SKU001', 'user1', 'Product One', 'Description One', 50.00, 100),
  ('SKU002', 'user2', 'Product Two', 'Description Two', 75.00, 150),
  ('SKU003', 'user3', 'Product Three', 'Description Three', 30.00, 50),
  ('SKU004', 'user4', 'Product Four', 'Description Four', 40.00, 200),
  ('SKU005', 'user5', 'Product Five', 'Description Five', 60.00, 120),
  ('RD001', 'demo', 'Radiator', 'Robust for heavy-duty trucks.', 89.99, 50),
  ('RG002', 'demo', 'Gearbox', 'Enhanced performance.', 129.99, 30),
  ('RB003', 'demo', 'Brake Kit', 'Reliable stopping power.', 74.99, 40),
  ('RW004', 'demo', 'Durable Wheel', 'Built for tough roads.', 49.99, 60),
  ('RE005', 'demo', 'Exhaust Kit', 'Improves efficiency.', 109.99, 25),
  ('RX006', 'demo', 'Xtreme Suspension', 'For off-road adventures.', 199.99, 20);


INSERT INTO invoice_items (item_id, invoice_id, username, sku, quantity, unit_price)
VALUES
  (1, '101', 'user1', 'SKU001', 2, 50.00),
  (2, '101', 'user1', 'SKU002', 3, 75.00),
  (3, '102', 'user2', 'SKU001', 1, 50.00),
  (4, '103', 'user3', 'SKU003', 5, 30.00),
  (5, '104', 'user4', 'SKU004', 2, 40.00);