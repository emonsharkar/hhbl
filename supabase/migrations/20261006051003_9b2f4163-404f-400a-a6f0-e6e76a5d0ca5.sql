CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC;
GRANT USAGE ON SCHEMA private TO authenticated;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin', 'super_admin'))
$$;
REVOKE ALL ON FUNCTION private.has_role(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.has_role(uuid) TO authenticated;

DROP POLICY "Published content is public" ON public.site_content;
DROP POLICY "Admins manage content" ON public.site_content;
CREATE POLICY "Published content is public" ON public.site_content FOR SELECT TO anon, authenticated USING (is_published OR private.has_role(auth.uid()));
CREATE POLICY "Admins manage content" ON public.site_content FOR ALL TO authenticated USING (private.has_role(auth.uid())) WITH CHECK (private.has_role(auth.uid()));

DROP POLICY "Published projects are public" ON public.projects;
DROP POLICY "Admins manage projects" ON public.projects;
CREATE POLICY "Published projects are public" ON public.projects FOR SELECT TO anon, authenticated USING (is_published OR private.has_role(auth.uid()));
CREATE POLICY "Admins manage projects" ON public.projects FOR ALL TO authenticated USING (private.has_role(auth.uid())) WITH CHECK (private.has_role(auth.uid()));

DROP POLICY "Published team is public" ON public.team_members;
DROP POLICY "Admins manage team" ON public.team_members;
CREATE POLICY "Published team is public" ON public.team_members FOR SELECT TO anon, authenticated USING (is_published OR private.has_role(auth.uid()));
CREATE POLICY "Admins manage team" ON public.team_members FOR ALL TO authenticated USING (private.has_role(auth.uid())) WITH CHECK (private.has_role(auth.uid()));

DROP POLICY "Published affiliations are public" ON public.affiliations;
DROP POLICY "Admins manage affiliations" ON public.affiliations;
CREATE POLICY "Published affiliations are public" ON public.affiliations FOR SELECT TO anon, authenticated USING (is_published OR private.has_role(auth.uid()));
CREATE POLICY "Admins manage affiliations" ON public.affiliations FOR ALL TO authenticated USING (private.has_role(auth.uid())) WITH CHECK (private.has_role(auth.uid()));

DROP POLICY "Admins manage messages" ON public.contact_messages;
CREATE POLICY "Admins manage messages" ON public.contact_messages FOR ALL TO authenticated USING (private.has_role(auth.uid())) WITH CHECK (private.has_role(auth.uid()));