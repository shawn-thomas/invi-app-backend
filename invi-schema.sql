/** Invi Tables */

CREATE TABLE Customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT
);

CREATE TABLE Invoices (
    invoice_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES Customers(customer_id),
    invoice_date DATE,
    total_amount DECIMAL(15, 2),
    status VARCHAR(20)
);

CREATE TABLE Inventory (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(15, 2),
    quantity_available INT
);

CREATE TABLE Invoice_Items (
    invoice_item_id SERIAL PRIMARY KEY,
    invoice_id INT REFERENCES Invoices(invoice_id),
    product_id INT REFERENCES Inventory(product_id),
    quantity INT,
    unit_price DECIMAL(15, 2)
);
