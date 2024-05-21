CREATE TABLE ls_users (
  user_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  color CHAR(7),
  avatar_url TEXT,
  has_custom_avatar BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE ls_stores (
  store_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  domain VARCHAR(255) NOT NULL UNIQUE,
  url TEXT,
  avatar_url TEXT,
  plan VARCHAR(50),
  country CHAR(2),
  country_nicename VARCHAR(100),
  currency CHAR(3),
  total_sales INT,
  total_revenue DECIMAL(10, 2),
  thirty_day_sales INT,
  thirty_day_revenue DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE ls_customers (
  customer_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
  store_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  STATUS VARCHAR(50),
  city VARCHAR(255),
  region VARCHAR(255),
  country CHAR(2),
  total_revenue_currency INT,
  mrr INT,
  status_formatted VARCHAR(50),
  country_formatted VARCHAR(100),
  total_revenue_currency_formatted VARCHAR(20),
  mrr_formatted VARCHAR(20),
  customer_portal_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  test_mode BOOLEAN DEFAULT false,
  FOREIGN KEY (store_id) REFERENCES ls_stores(store_id)
);

CREATE TABLE ls_products (
  product_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
  store_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  STATUS VARCHAR(50),
  status_formatted VARCHAR(50),
  thumb_url TEXT,
  large_thumb_url TEXT,
  price VARCHAR(255),
  price_formatted VARCHAR(20),
  from_price VARCHAR(255),
  to_price VARCHAR(255),
  pay_what_you_want BOOLEAN DEFAULT false,
  buy_now_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  test_mode BOOLEAN DEFAULT false,
  FOREIGN KEY (store_id) REFERENCES ls_stores(store_id)
);

CREATE TABLE ls_variants (
  variant_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
  product_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  price VARCHAR(255),
  is_subscription BOOLEAN DEFAULT false,
  INTERVAL VARCHAR(50),
  interval_count INT,
  has_free_trial BOOLEAN DEFAULT false,
  trial_interval VARCHAR(50),
  trial_interval_count INT,
  pay_what_you_want BOOLEAN DEFAULT false,
  min_price VARCHAR(255),
  suggested_price VARCHAR(255),
  has_license_keys BOOLEAN DEFAULT false,
  license_activation_limit INT,
  is_license_limit_unlimited BOOLEAN DEFAULT false,
  license_length_value INT,
  license_length_unit VARCHAR(50),
  is_license_length_unlimited BOOLEAN DEFAULT false,
  sort INT,
  STATUS VARCHAR(50),
  status_formatted VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  test_mode BOOLEAN DEFAULT false,
  FOREIGN KEY (product_id) REFERENCES ls_products(product_id)
);

CREATE TABLE ls_prices (
  price_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
  variant_id VARCHAR(255) NOT NULL,
  category VARCHAR(50),
  scheme VARCHAR(50),
  usage_aggregation VARCHAR(50),
  unit_price VARCHAR(255),
  unit_price_decimal NUMERIC,
  setup_fee_enabled BOOLEAN DEFAULT false,
  setup_fee VARCHAR(255),
  package_size INT,
  renewal_interval_unit VARCHAR(50),
  renewal_interval_quantity INT,
  trial_interval_unit VARCHAR(50),
  trial_interval_quantity INT,
  min_price VARCHAR(255),
  suggested_price VARCHAR(255),
  tax_code VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY (variant_id) REFERENCES ls_variants(variant_id)
);

CREATE TABLE ls_price_tiers (
  id SERIAL PRIMARY KEY,
  price_id VARCHAR(255) NOT NULL,
  last_unit VARCHAR(50),
  -- Using VARCHAR to accommodate "inf" as a value.
  unit_price VARCHAR(255),
  unit_price_decimal NUMERIC,
  fixed_fee VARCHAR(255),
  FOREIGN KEY (price_id) REFERENCES ls_prices(price_id)
);

CREATE TABLE ls_files (
  file_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
  variant_id VARCHAR(255) NOT NULL,
  identifier UUID NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  extension VARCHAR(10),
  download_url TEXT NOT NULL,
  size INT,
  size_formatted VARCHAR(50),
  version VARCHAR(50),
  sort INT,
  STATUS VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  test_mode BOOLEAN DEFAULT false,
  FOREIGN KEY (variant_id) REFERENCES ls_variants(variant_id)
);

CREATE TABLE ls_orders (
  order_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
  store_id VARCHAR(255) NOT NULL,
  customer_id VARCHAR(255) NOT NULL,
  identifier UUID NOT NULL UNIQUE,
  order_number INT NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  currency CHAR(3) NOT NULL,
  currency_rate NUMERIC(10, 4) NOT NULL,  -- Corrected line
  subtotal VARCHAR(255) NOT NULL,
  setup_fee VARCHAR(255) NOT NULL,
  discount_total VARCHAR(255) NOT NULL,
  tax VARCHAR(255) NOT NULL,
  total VARCHAR(255) NOT NULL,
  subtotal_usd VARCHAR(255) NOT NULL,
  setup_fee_usd VARCHAR(255) NOT NULL,
  discount_total_usd VARCHAR(255) NOT NULL,
  tax_usd VARCHAR(255) NOT NULL,
  total_usd VARCHAR(255) NOT NULL,
  tax_name VARCHAR(50) NOT NULL,
  tax_rate NUMERIC(5, 2) NOT NULL,  -- Corrected line
  STATUS VARCHAR(50) NOT NULL,
  status_formatted VARCHAR(50) NOT NULL,
  refunded BOOLEAN DEFAULT false NOT NULL,
  refunded_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
  test_mode BOOLEAN DEFAULT false NOT NULL
);

CREATE TABLE ls_order_items (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(255) NOT NULL,
  product_id VARCHAR(255) NOT NULL,
  variant_id VARCHAR(255) NOT NULL,
  product_name VARCHAR(255),
  variant_name VARCHAR(255),
  price INT NOT NULL,
  price_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  test_mode BOOLEAN DEFAULT false NOT NULL,
  FOREIGN KEY (order_id) REFERENCES ls_orders(order_id)
);

CREATE TABLE ls_subscriptions (
  subscription_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
  store_id VARCHAR(255) NOT NULL,
  customer_id VARCHAR(255) NOT NULL,
  order_id VARCHAR(255) NOT NULL,
  order_item_id VARCHAR(255) NOT NULL,
  product_id VARCHAR(255) NOT NULL,
  variant_id VARCHAR(255) NOT NULL,
  product_name VARCHAR(255),
  variant_name VARCHAR(255),
  user_name VARCHAR(255),
  user_email VARCHAR(255),
  STATUS VARCHAR(50),
  status_formatted VARCHAR(50),
  card_brand VARCHAR(50),
  card_last_four CHAR(4),
  pause BOOLEAN,
  cancelled BOOLEAN DEFAULT false,
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  billing_anchor VARCHAR(255),
  renews_at TIMESTAMP WITH TIME ZONE,
  ends_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  test_mode BOOLEAN DEFAULT false,
  urls JSONB
);

CREATE TABLE ls_subscription_items (
  id SERIAL PRIMARY KEY,
  subscription_id VARCHAR(255) NOT NULL,
  price_id VARCHAR(255) NOT NULL,
  quantity INT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY (subscription_id) REFERENCES ls_subscriptions(subscription_id)
);

CREATE TABLE ls_usage_records (
  usage_record_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
  subscription_item_id INT NOT NULL,
  quantity INT,
  ACTION VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY (subscription_item_id) REFERENCES ls_subscription_items(id)
);

CREATE TABLE ls_discounts (
  discount_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
  store_id VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  code VARCHAR(50) NOT NULL UNIQUE,
  amount VARCHAR(255),
  amount_type VARCHAR(50),
  is_limited_to_products BOOLEAN DEFAULT false,
  is_limited_redemptions BOOLEAN DEFAULT false,
  max_redemptions INT,
  starts_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  duration VARCHAR(50),
  duration_in_months INT,
  STATUS VARCHAR(50),
  status_formatted VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  test_mode BOOLEAN DEFAULT false
);

CREATE TABLE ls_discount_redemptions (
  discount_redemption_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
  discount_id VARCHAR(255) NOT NULL,
  order_id VARCHAR(255) NOT NULL,
  discount_name VARCHAR(255),
  discount_code VARCHAR(50),
  discount_amount VARCHAR(255),
  discount_amount_type VARCHAR(50),
  amount VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY (discount_id) REFERENCES ls_discounts(discount_id),
  FOREIGN KEY (order_id) REFERENCES ls_orders(order_id)
);

CREATE TABLE ls_license_keys (
  license_key_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
  store_id VARCHAR(255) NOT NULL,
  customer_id VARCHAR(255) NOT NULL,
  order_id VARCHAR(255) NOT NULL,
  order_item_id INT NOT NULL,
  product_id VARCHAR(255) NOT NULL,
  user_name VARCHAR(255),
  user_email VARCHAR(255),
  KEY UUID NOT NULL UNIQUE,
  key_short VARCHAR(255),
  activation_limit INT,
  instances_count INT DEFAULT 0,
  disabled BOOLEAN DEFAULT false,
  STATUS VARCHAR(50),
  status_formatted VARCHAR(50),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY (store_id) REFERENCES ls_stores(store_id),
  FOREIGN KEY (customer_id) REFERENCES ls_customers(customer_id),
  FOREIGN KEY (order_id) REFERENCES ls_orders(order_id),
  FOREIGN KEY (order_item_id) REFERENCES ls_order_items(id),
  FOREIGN KEY (product_id) REFERENCES ls_products(product_id)
);

CREATE TABLE ls_license_key_instances (
  license_key_instance_id VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
  license_key_id VARCHAR(255) NOT NULL,
  identifier UUID NOT NULL UNIQUE,
  name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  FOREIGN KEY (license_key_id) REFERENCES ls_license_keys(license_key_id)
);
CREATE TABLE ls_checkouts (
  id UUID PRIMARY KEY,
  store_id VARCHAR(255) NOT NULL,
  variant_id VARCHAR(255) NOT NULL,
  custom_price VARCHAR(255),
  product_options JSONB,
  checkout_options JSONB,
  checkout_data JSONB,
  preview JSONB,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
  test_mode BOOLEAN DEFAULT false,
  url TEXT NOT NULL
);

-- ALTER TABLE ls_users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ls_stores ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ls_customers ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ls_products ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ls_variants ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ls_prices ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ls_price_tiers ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ls_files ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ls_orders ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ls_order_items ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ls_subscriptions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ls_subscription_items ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ls_usage_records ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ls_discounts ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ls_discount_redemptions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ls_license_keys ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ls_license_key_instances ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ls_checkouts ENABLE ROW LEVEL SECURITY;
-- Delete queries for all tables above with CASCADE
-- DROP TABLE ls_license_key_instances CASCADE;
-- DROP TABLE ls_license_keys CASCADE;
-- DROP TABLE ls_discount_redemptions CASCADE;
-- DROP TABLE ls_discounts CASCADE;
-- DROP TABLE ls_usage_records CASCADE;
-- DROP TABLE ls_subscription_items CASCADE;
-- DROP TABLE ls_subscriptions CASCADE;
-- DROP TABLE ls_order_items CASCADE;
-- DROP TABLE ls_orders CASCADE;
-- DROP TABLE ls_files CASCADE;
-- DROP TABLE ls_price_tiers CASCADE;
-- DROP TABLE ls_prices CASCADE;
-- DROP TABLE ls_variants CASCADE;
-- DROP TABLE ls_products CASCADE;
-- DROP TABLE ls_customers CASCADE;
-- DROP TABLE ls_stores CASCADE;
-- DROP TABLE ls_users CASCADE;
-- DROP TABLE ls_checkouts CASCADE;
-- DROP TABLE ls_checkouts CASCADE;