-- Customers Table Seed Data
INSERT INTO Customers (customer_name, first_name, last_name, email, phone, address)
VALUES
('JohnDoe', 'John', 'Doe', 'john@example.com', '123-456-7890', '123 Main St'),
('AliceSmith', 'Alice', 'Smith', 'alice@example.com', '987-654-3210', '456 Oak Ave'),
('BobJohnson', 'Bob', 'Johnson', 'bob@example.com', '555-123-4567', '789 Elm St'),
('EveWilliams', 'Eve', 'Williams', 'eve@example.com', '111-222-3333', '321 Pine St'),
('MichaelBrown', 'Michael', 'Brown', 'michael@example.com', '444-555-6666', '567 Cedar Ave'),
('SophiaMiller', 'Sophia', 'Miller', 'sophia@example.com', '777-888-9999', '654 Birch St'),
('DavidWilson', 'David', 'Wilson', 'david@example.com', '666-777-8888', '432 Spruce St'),
('OliviaGarcia', 'Olivia', 'Garcia', 'olivia@example.com', '222-333-4444', '876 Maple Ave'),
('WilliamMartinez', 'William', 'Martinez', 'william@example.com', '999-000-1111', '210 Oak St'),
('EmmaLopez', 'Emma', 'Lopez', 'emma@example.com', '444-333-2222', '753 Pine St');


INSERT INTO Invoices (customer_id, invoice_date, total_amount, status)
VALUES
(1, '2023-01-15', 150.25, 'Paid'),
(2, '2023-02-28', 75.50, 'Pending'),
(3, '2023-03-10', 200.00, 'Paid'),
(4, '2023-04-22', 120.75, 'Pending'),
(5, '2023-05-05', 300.00, 'Paid'),
(6, '2023-06-18', 180.50, 'Paid'),
(7, '2023-07-30', 90.75, 'Pending'),
(8, '2023-08-14', 250.00, 'Paid'),
(9, '2023-09-27', 175.25, 'Pending'),
(10, '2023-10-31', 350.00, 'Paid');


INSERT INTO Inventory (product_name, description, price, quantity_available)
VALUES
('Product A', 'Description for Product A', 49.99, 100),
('Product B', 'Description for Product B', 29.99, 75),
('Product C', 'Description for Product C', 99.99, 50),
('Product D', 'Description for Product D', 19.99, 200),
('Product E', 'Description for Product E', 149.99, 25),
('Product F', 'Description for Product F', 199.99, 40),
('Product G', 'Description for Product G', 79.99, 60),
('Product H', 'Description for Product H', 69.99, 80),
('Product I', 'Description for Product I', 89.99, 55),
('Product J', 'Description for Product J', 129.99, 30);


INSERT INTO Invoice_Items (invoice_id, product_id, quantity, unit_price)
VALUES
(1, 1, 2, 49.99),
(2, 3, 1, 99.99),
(3, 2, 3, 29.99),
(4, 4, 4, 19.99),
(5, 5, 1, 149.99),
(6, 6, 2, 199.99),
(7, 7, 3, 79.99),
(8, 8, 2, 69.99),
(9, 9, 5, 89.99),
(10, 10, 1, 129.99);