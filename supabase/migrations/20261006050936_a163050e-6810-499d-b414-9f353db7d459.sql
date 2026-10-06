DROP POLICY "Published content is public" ON public.site_content;
DROP POLICY "Admins manage content" ON public.site_content;
CREATE POLICY "Published content is public" ON public.site_content FOR SELECT TO anon, authenticated USING (is_published OR EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'super_admin')));
CREATE POLICY "Admins manage content" ON public.site_content FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'super_admin'))) WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'super_admin')));

DROP POLICY "Published projects are public" ON public.projects;
DROP POLICY "Admins manage projects" ON public.projects;
CREATE POLICY "Published projects are public" ON public.projects FOR SELECT TO anon, authenticated USING (is_published OR EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'super_admin')));
CREATE POLICY "Admins manage projects" ON public.projects FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'super_admin'))) WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'super_admin')));

DROP POLICY "Published team is public" ON public.team_members;
DROP POLICY "Admins manage team" ON public.team_members;
CREATE POLICY "Published team is public" ON public.team_members FOR SELECT TO anon, authenticated USING (is_published OR EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'super_admin')));
CREATE POLICY "Admins manage team" ON public.team_members FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'super_admin'))) WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'super_admin')));

DROP POLICY "Published affiliations are public" ON public.affiliations;
DROP POLICY "Admins manage affiliations" ON public.affiliations;
CREATE POLICY "Published affiliations are public" ON public.affiliations FOR SELECT TO anon, authenticated USING (is_published OR EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'super_admin')));
CREATE POLICY "Admins manage affiliations" ON public.affiliations FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'super_admin'))) WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'super_admin')));

DROP POLICY "Admins manage messages" ON public.contact_messages;
CREATE POLICY "Admins manage messages" ON public.contact_messages FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'super_admin'))) WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role IN ('admin', 'super_admin')));

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
DROP FUNCTION public.has_role(uuid, public.app_role);