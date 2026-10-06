CREATE POLICY "Designated super admin can claim initial role" ON public.user_roles
FOR INSERT TO authenticated
WITH CHECK (
  user_id = auth.uid()
  AND role = 'super_admin'
  AND lower(coalesce(auth.jwt() ->> 'email', '')) = 'admin@admin.com'
  AND NOT EXISTS (SELECT 1 FROM public.user_roles existing WHERE existing.role = 'super_admin')
);