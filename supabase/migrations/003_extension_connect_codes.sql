-- Extension Connect Codes Table
-- Stores one-time codes for secure extension authentication
-- Codes are single-use and expire after 5 minutes
-- Tokens are stored encrypted and deleted after use

CREATE TABLE IF NOT EXISTS extension_connect_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  extension_id TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  token_expires_at BIGINT NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(code)
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_extension_connect_codes_code ON extension_connect_codes(code);
CREATE INDEX IF NOT EXISTS idx_extension_connect_codes_user_id ON extension_connect_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_extension_connect_codes_extension_id ON extension_connect_codes(extension_id);
CREATE INDEX IF NOT EXISTS idx_extension_connect_codes_expires_at ON extension_connect_codes(expires_at);

-- Index for cleanup queries
CREATE INDEX IF NOT EXISTS idx_extension_connect_codes_used_expires ON extension_connect_codes(used, expires_at);

-- RLS Policies
ALTER TABLE extension_connect_codes ENABLE ROW LEVEL SECURITY;

-- Service role can manage all codes (for server-side operations)
CREATE POLICY "Service role can manage extension connect codes"
  ON extension_connect_codes FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Function to clean up expired codes (can be called by cron)
CREATE OR REPLACE FUNCTION cleanup_expired_extension_codes()
RETURNS void AS $$
BEGIN
  DELETE FROM extension_connect_codes
  WHERE expires_at < NOW() OR used = TRUE;
END;
$$ LANGUAGE plpgsql;

