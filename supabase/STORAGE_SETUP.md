# Supabase Storage Setup

After running the SQL migration, you need to create a storage bucket for screenshots.

## Steps:

1. Go to your Supabase dashboard
2. Navigate to Storage
3. Create a new bucket named `screenshots`
4. Set it to **Public** (or use signed URLs - see below)
5. Add the following RLS policy:

```sql
-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload screenshots"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'screenshots');

-- Allow authenticated users to read their own uploads
CREATE POLICY "Users can read own screenshots"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'screenshots');

-- Allow service role full access (for admin operations)
CREATE POLICY "Service role can manage screenshots"
ON storage.objects FOR ALL
TO service_role
USING (bucket_id = 'screenshots');
```

**Note:** If you prefer to keep the bucket private, the application uses signed URLs via the `/api/screenshots/[path]` endpoint, which will work with a private bucket as well.

