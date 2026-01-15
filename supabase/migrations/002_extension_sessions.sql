-- Extension Sessions Table
-- Tracks Chrome extension usage per user

CREATE TABLE IF NOT EXISTS extension_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  extension_id TEXT,
  extension_version TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_used_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_extension_sessions_user_id ON extension_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_extension_sessions_last_used ON extension_sessions(last_used_at DESC);

-- RLS Policies
ALTER TABLE extension_sessions ENABLE ROW LEVEL SECURITY;

-- Users can view their own extension sessions
CREATE POLICY "Users can view own extension sessions"
  ON extension_sessions FOR SELECT
  USING (auth.uid() = user_id);

-- Service role can manage all extension sessions (for tracking)
CREATE POLICY "Service role can manage extension sessions"
  ON extension_sessions FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Trigger to update last_used_at
CREATE OR REPLACE FUNCTION update_extension_session_last_used()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_used_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_extension_sessions_last_used
  BEFORE UPDATE ON extension_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_extension_session_last_used();

