-- Add Paddle-specific fields to subscriptions table
ALTER TABLE subscriptions 
ADD COLUMN IF NOT EXISTS paddle_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS paddle_customer_id TEXT;

-- Add Paddle transaction ID to screening_upgrades
ALTER TABLE screening_upgrades 
ADD COLUMN IF NOT EXISTS paddle_transaction_id TEXT;

-- Create indexes for Paddle IDs
CREATE INDEX IF NOT EXISTS idx_subscriptions_paddle_subscription_id ON subscriptions(paddle_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_paddle_customer_id ON subscriptions(paddle_customer_id);
CREATE INDEX IF NOT EXISTS idx_screening_upgrades_paddle_transaction_id ON screening_upgrades(paddle_transaction_id);

-- Update existing records to use Paddle fields (optional migration)
-- You can keep Stripe fields for historical data or remove them later
