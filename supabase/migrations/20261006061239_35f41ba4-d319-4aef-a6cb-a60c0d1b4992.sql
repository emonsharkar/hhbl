CREATE POLICY "Admins upload site media"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'site-media' AND private.has_role(auth.uid()));

CREATE POLICY "Admins update site media"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'site-media' AND private.has_role(auth.uid()))
WITH CHECK (bucket_id = 'site-media' AND private.has_role(auth.uid()));

CREATE POLICY "Admins delete site media"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'site-media' AND private.has_role(auth.uid()));

CREATE POLICY "Admins read site media"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'site-media' AND private.has_role(auth.uid()));