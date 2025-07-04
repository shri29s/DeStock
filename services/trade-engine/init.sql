-- Initialize the DeStock database schema

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    company_id BIGINT NOT NULL,
    trader_address VARCHAR(42) NOT NULL,
    is_buy BOOLEAN NOT NULL,
    amount BIGINT NOT NULL,
    price BIGINT NOT NULL,
    timestamp BIGINT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create price_history table
CREATE TABLE IF NOT EXISTS price_history (
    id BIGSERIAL PRIMARY KEY,
    company_id BIGINT NOT NULL,
    price BIGINT NOT NULL,
    volume BIGINT DEFAULT 0,
    timestamp BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create trade_history table
CREATE TABLE IF NOT EXISTS trade_history (
    id BIGSERIAL PRIMARY KEY,
    company_id BIGINT NOT NULL,
    buyer_address VARCHAR(42) NOT NULL,
    seller_address VARCHAR(42) NOT NULL,
    amount BIGINT NOT NULL,
    price BIGINT NOT NULL,
    fee BIGINT NOT NULL,
    tx_hash VARCHAR(66),
    timestamp BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_company_id ON orders(company_id);
CREATE INDEX IF NOT EXISTS idx_orders_trader_address ON orders(trader_address);
CREATE INDEX IF NOT EXISTS idx_orders_is_buy ON orders(is_buy);
CREATE INDEX IF NOT EXISTS idx_orders_price ON orders(price);
CREATE INDEX IF NOT EXISTS idx_orders_is_active ON orders(is_active);

CREATE INDEX IF NOT EXISTS idx_price_history_company_id ON price_history(company_id);
CREATE INDEX IF NOT EXISTS idx_price_history_timestamp ON price_history(timestamp);

CREATE INDEX IF NOT EXISTS idx_trade_history_company_id ON trade_history(company_id);
CREATE INDEX IF NOT EXISTS idx_trade_history_buyer ON trade_history(buyer_address);
CREATE INDEX IF NOT EXISTS idx_trade_history_seller ON trade_history(seller_address);
CREATE INDEX IF NOT EXISTS idx_trade_history_timestamp ON trade_history(timestamp);

-- Create a trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at 
    BEFORE UPDATE ON orders 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
