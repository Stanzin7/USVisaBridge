-- Add privacy and retention fields to slot_reports table
ALTER TABLE slot_reports
ADD COLUMN IF NOT EXISTS share_with_community BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS retention_expires_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS parsed_data JSONB,
ADD COLUMN IF NOT EXISTS redaction_applied BOOLEAN DEFAULT false;

-- Create index for retention cleanup
CREATE INDEX IF NOT EXISTS idx_slot_reports_retention_expires ON slot_reports(retention_expires_at)
WHERE retention_expires_at IS NOT NULL;

-- Create index for community-shared reports
CREATE INDEX IF NOT EXISTS idx_slot_reports_community ON slot_reports(share_with_community, created_at DESC)
WHERE share_with_community = true AND status = 'verified';

-- Function to set retention expiration (24 hours for raw images, longer for extracted data)
CREATE OR REPLACE FUNCTION set_retention_expiration()
RETURNS TRIGGER AS $$
BEGIN
  -- Set retention to 24 hours if screenshot exists, 7 days for extracted data only
  IF NEW.screenshot_path IS NOT NULL THEN
    NEW.retention_expires_at = NOW() + INTERVAL '24 hours';
  ELSE
    NEW.retention_expires_at = NOW() + INTERVAL '7 days';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-set retention expiration
DROP TRIGGER IF EXISTS trigger_set_retention_expiration ON slot_reports;
CREATE TRIGGER trigger_set_retention_expiration
  BEFORE INSERT ON slot_reports
  FOR EACH ROW
  EXECUTE FUNCTION set_retention_expiration();

