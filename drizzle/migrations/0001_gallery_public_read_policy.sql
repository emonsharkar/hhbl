DROP POLICY "Published gallery images are public" ON public.gallery_images;
CREATE POLICY "Published gallery images are public" ON public.gallery_images FOR SELECT TO anon USING (is_published);
CREATE POLICY "Authenticated gallery visibility" ON public.gallery_images FOR SELECT TO authenticated USING (is_published OR private.has_role(auth.uid()));