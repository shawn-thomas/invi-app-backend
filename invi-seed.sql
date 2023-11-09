-- Customers Table Seed Data

INSERT INTO users (username, password, first_name, last_name, email)
VALUES
('johnny123', 'password123', 'John', 'Doe', 'john@example.com'),
('alice55', 'alicepassword', 'Alice', 'Smith', 'alice@example.com'),
('bobj89', 'bobjpassword', 'Bob', 'Johnson', 'bob@example.com'),
('eviewill', 'eviepassword', 'Eve', 'Williams', 'eve@example.com'),
('mikeb123', 'mikepass789', 'Michael', 'Brown', 'michael@example.com'),
('sophia.m', 'sophia987', 'Sophia', 'Miller', 'sophia@example.com'),
('d_wilson', 'davidWpass', 'David', 'Wilson', 'david@example.com'),
('olivia_g', 'olivia123', 'Olivia', 'Garcia', 'olivia@example.com'),
('will.mtz', 'williamPass', 'William', 'Martinez', 'william@example.com'),
('e_lopez', 'emma456', 'Emma', 'Lopez', 'emma@example.com');

INSERT INTO customers (user_id, customer_name, first_name, last_name, email, phone, address)
VALUES
(1, 'JohnDoe', 'John', 'Doe', 'john@example.com', '123-456-7890', '123 Main St'),
(2, 'AliceSmith', 'Alice', 'Smith', 'alice@example.com', '987-654-3210', '456 Oak Ave'),
(3, 'BobJohnson', 'Bob', 'Johnson', 'bob@example.com', '555-123-4567', '789 Elm St'),
(4, 'EveWilliams', 'Eve', 'Williams', 'eve@example.com', '111-222-3333', '321 Pine St'),
(5, 'MichaelBrown', 'Michael', 'Brown', 'michael@example.com', '444-555-6666', '567 Cedar Ave'),
(6, 'SophiaMiller', 'Sophia', 'Miller', 'sophia@example.com', '777-888-9999', '654 Birch St'),
(7, 'DavidWilson', 'David', 'Wilson', 'david@example.com', '666-777-8888', '432 Spruce St'),
(8, 'OliviaGarcia', 'Olivia', 'Garcia', 'olivia@example.com', '222-333-4444', '876 Maple Ave'),
(9, 'WilliamMartinez', 'William', 'Martinez', 'william@example.com', '999-000-1111', '210 Oak St'),
(10, 'EmmaLopez', 'Emma', 'Lopez', 'emma@example.com', '444-333-2222', '753 Pine St');

INSERT INTO invoices (user_id, customer_id, invoice_date, total_amount, status)
VALUES
(1, 1, '2023-01-15', 150.25, 'Paid'),
(2, 2, '2023-02-28', 75.50, 'Pending'),
(3, 3, '2023-03-10', 200.00, 'Paid'),
(4, 4, '2023-04-22', 120.75, 'Pending'),
(5, 5, '2023-05-05', 300.00, 'Paid'),
(6, 6, '2023-06-18', 180.50, 'Paid'),
(7, 7, '2023-07-30', 90.75, 'Pending'),
(8, 8, '2023-08-14', 250.00, 'Paid'),
(9, 9, '2023-09-27', 175.25, 'Pending'),
(10, 10, '2023-10-31', 350.00, 'Paid');

INSERT INTO inventory (user_id, product_name, description, price, quantity_available)
VALUES
(1, 'Product A', 'Description for Product A', 49.99, 100),
(2, 'Product B', 'Description for Product B', 29.99, 75),
(3, 'Product C', 'Description for Product C', 99.99, 50),
(4, 'Product D', 'Description for Product D', 19.99, 200),
(5, 'Product E', 'Description for Product E', 149.99, 25),
(6, 'Product F', 'Description for Product F', 199.99, 40),
(7, 'Product G', 'Description for Product G', 79.99, 60),
(8, 'Product H', 'Description for Product H', 69.99, 80),
(9, 'Product I', 'Description for Product I', 89.99, 55),
(10, 'Product J', 'Description for Product J', 129.99, 30);

INSERT INTO invoice_items (invoice_id, product_id, quantity, unit_price)
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
