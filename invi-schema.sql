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
  quantity_available INT,
  CONSTRAINT unique_sku_per_user UNIQUE (sku, username)
);

CREATE TABLE invoice_items (
  item_id SERIAL PRIMARY KEY,
  invoice_id VARCHAR(20),
  username VARCHAR(25),
  sku VARCHAR(25),
  quantity INT,
  unit_price DECIMAL(15, 2) CHECK (unit_price >= 0),
  CONSTRAINT fk_invoice_items FOREIGN KEY (invoice_id, username) REFERENCES invoices(invoice_id, username) ON DELETE CASCADE
);

CREATE TABLE audit (
  audit_id SERIAL PRIMARY KEY,
  record_id VARCHAR(20),
  username VARCHAR(25) NOT NULL,
  sku VARCHAR(25) NOT NULL,
  previous_quantity_available INT NOT NULL,
  new_quantity_available INT NOT NULL,
  change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reason VARCHAR(20) NOT NULL,
  CONSTRAINT fk_audit_inventory FOREIGN KEY (sku, username) REFERENCES inventory(sku, username) ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION update_audit()
RETURNS TRIGGER AS $$
DECLARE
  item_row RECORD;
  item_sku VARCHAR(25);
  item_quantity INT;
  previous_quantity INT;
BEGIN
  IF NEW.status = 'Paid' THEN
    FOR item_row IN
      SELECT ii.sku, ii.quantity
      FROM invoice_items ii
      WHERE ii.invoice_id = NEW.invoice_id AND ii.username = NEW.username
    LOOP
      item_sku := item_row.sku;
      item_quantity := item_row.quantity;

      BEGIN
        SELECT quantity_available INTO previous_quantity
        FROM inventory
        WHERE sku = item_sku AND username = NEW.username;

        UPDATE inventory
        SET quantity_available = previous_quantity - item_quantity
        WHERE sku = item_sku AND username = NEW.username;

        INSERT INTO audit (record_id, username, sku, previous_quantity_available, new_quantity_available, reason)
        VALUES (NEW.invoice_id, NEW.username, item_sku, previous_quantity, previous_quantity - item_quantity, 'Invoice Paid');

      EXCEPTION
        WHEN OTHERS THEN
          RAISE NOTICE 'Error processing item with SKU %: %', item_sku, SQLERRM;
      END;
    END LOOP;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER after_update_invoice
AFTER UPDATE ON invoices
FOR EACH ROW
EXECUTE FUNCTION update_audit();

CREATE OR REPLACE FUNCTION update_audit_inventory()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.quantity_available > OLD.quantity_available THEN
    INSERT INTO audit (record_id, username, sku, previous_quantity_available, new_quantity_available, reason)
    VALUES ('Not Applicable', NEW.username, NEW.sku, OLD.quantity_available, NEW.quantity_available, 'Restock');
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER after_update_inventory
AFTER UPDATE ON inventory
FOR EACH ROW
EXECUTE FUNCTION update_audit_inventory();
