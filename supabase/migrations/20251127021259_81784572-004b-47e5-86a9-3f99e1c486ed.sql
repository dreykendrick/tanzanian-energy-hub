-- Create storage bucket for team avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('team-avatars', 'team-avatars', true);

-- Allow admins to upload team avatars
CREATE POLICY "Admins can upload team avatars"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'team-avatars' 
  AND (storage.foldername(name))[1] = 'avatars'
  AND EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Allow admins to update team avatars
CREATE POLICY "Admins can update team avatars"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'team-avatars'
  AND EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Allow admins to delete team avatars
CREATE POLICY "Admins can delete team avatars"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'team-avatars'
  AND EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Allow public read access to team avatars
CREATE POLICY "Anyone can view team avatars"
ON storage.objects
FOR SELECT
USING (bucket_id = 'team-avatars');