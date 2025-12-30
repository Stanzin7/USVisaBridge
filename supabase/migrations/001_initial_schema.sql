-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (linked to auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Preferences table (user alert preferences)
CREATE TABLE IF NOT EXISTS preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  visa_type TEXT NOT NULL,
  consulate TEXT NOT NULL,
  date_start DATE,
  date_end DATE,
  channels TEXT[] DEFAULT ARRAY['email']::TEXT[],
  quiet_hours_start INTEGER DEFAULT 22, -- 22:00 (10 PM)
  quiet_hours_end INTEGER DEFAULT 8, -- 08:00 (8 AM)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, visa_type, consulate)
);

-- Slot reports table (user-submitted reports)
CREATE TABLE IF NOT EXISTS slot_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE SET NULL,
  consulate TEXT NOT NULL,
  visa_type TEXT NOT NULL,
  earliest_date DATE NOT NULL,
  latest_date DATE,
  screenshot_path TEXT,
  source TEXT DEFAULT 'user_submission',
  confidence DECIMAL(3,2) DEFAULT 0.50,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Report verification table (admin review decisions)
CREATE TABLE IF NOT EXISTS report_verification (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID NOT NULL REFERENCES slot_reports(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  decision TEXT NOT NULL CHECK (decision IN ('verified', 'rejected')),
  reason_codes TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alerts table (sent alerts with deduplication)
CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  report_id UUID NOT NULL REFERENCES slot_reports(id) ON DELETE CASCADE,
  channel TEXT NOT NULL CHECK (channel IN ('email', 'sms', 'push')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  error TEXT,
  sent_at TIMESTAMPTZ,
  dedupe_key TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(dedupe_key)
);

-- Audit events table
CREATE TABLE IF NOT EXISTS audit_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  meta JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_preferences_user_id ON preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_preferences_visa_consulate ON preferences(visa_type, consulate);
CREATE INDEX IF NOT EXISTS idx_slot_reports_status ON slot_reports(status);
CREATE INDEX IF NOT EXISTS idx_slot_reports_created_at ON slot_reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_slot_reports_visa_consulate ON slot_reports(visa_type, consulate);
CREATE INDEX IF NOT EXISTS idx_report_verification_report_id ON report_verification(report_id);
CREATE INDEX IF NOT EXISTS idx_alerts_user_id ON alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_alerts_report_id ON alerts(report_id);
CREATE INDEX IF NOT EXISTS idx_alerts_dedupe_key ON alerts(dedupe_key);
CREATE INDEX IF NOT EXISTS idx_audit_events_actor_id ON audit_events(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_events_created_at ON audit_events(created_at DESC);

-- RLS Policies

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE slot_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_verification ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_events ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Preferences policies
CREATE POLICY "Users can view own preferences"
  ON preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON preferences FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own preferences"
  ON preferences FOR DELETE
  USING (auth.uid() = user_id);

-- Slot reports policies
CREATE POLICY "Users can view verified reports"
  ON slot_reports FOR SELECT
  USING (status = 'verified');

CREATE POLICY "Users can insert own reports"
  ON slot_reports FOR INSERT
  WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Users can view own reports"
  ON slot_reports FOR SELECT
  USING (auth.uid() = reporter_id);

-- Report verification policies (admin only - handled in API)
CREATE POLICY "Service role can manage verifications"
  ON report_verification FOR ALL
  USING (true)
  WITH CHECK (true);

-- Alerts policies
CREATE POLICY "Users can view own alerts"
  ON alerts FOR SELECT
  USING (auth.uid() = user_id);

-- Audit events policies (read-only for users, full access for service role)
CREATE POLICY "Service role can manage audit events"
  ON audit_events FOR ALL
  USING (true)
  WITH CHECK (true);

-- Functions and triggers

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_preferences_updated_at BEFORE UPDATE ON preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_slot_reports_updated_at BEFORE UPDATE ON slot_reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

