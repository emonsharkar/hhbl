CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin');

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

CREATE POLICY "Users can read their own roles" ON public.user_roles
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key text NOT NULL UNIQUE,
  heading text NOT NULL,
  body text NOT NULL DEFAULT '',
  extra jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published content is public" ON public.site_content FOR SELECT TO anon, authenticated USING (is_published OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Admins manage content" ON public.site_content FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));
CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  location text NOT NULL,
  status text NOT NULL DEFAULT 'Ongoing',
  summary text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  image_key text NOT NULL DEFAULT 'aurora',
  image_url text,
  amenities text[] NOT NULL DEFAULT '{}',
  facts jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_featured boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published projects are public" ON public.projects FOR SELECT TO anon, authenticated USING (is_published OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Admins manage projects" ON public.projects FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  biography text NOT NULL DEFAULT '',
  image_url text,
  is_published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.team_members TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.team_members TO authenticated;
GRANT ALL ON public.team_members TO service_role;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published team is public" ON public.team_members FOR SELECT TO anon, authenticated USING (is_published OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Admins manage team" ON public.team_members FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.affiliations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  website_url text,
  is_published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.affiliations TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.affiliations TO authenticated;
GRANT ALL ON public.affiliations TO service_role;
ALTER TABLE public.affiliations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published affiliations are public" ON public.affiliations FOR SELECT TO anon, authenticated USING (is_published OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Admins manage affiliations" ON public.affiliations FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));
CREATE TRIGGER update_affiliations_updated_at BEFORE UPDATE ON public.affiliations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors can send messages" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (char_length(name) BETWEEN 2 AND 100 AND char_length(email) BETWEEN 5 AND 200 AND char_length(subject) BETWEEN 2 AND 160 AND char_length(message) BETWEEN 10 AND 3000);
CREATE POLICY "Admins manage messages" ON public.contact_messages FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'super_admin'));
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON public.contact_messages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.site_content (section_key, heading, body, extra) VALUES
('hero', 'Haque Home & Builders Limited', 'Your trusted partner for thoughtful homes and enduring value in Bangladesh.', '{"eyebrow":"We Are","cta":"Explore Our Projects"}'),
('introduction', 'Built on trust. Designed for life.', 'Haque Home & Builders Limited creates considered residential spaces where craftsmanship, comfort, and community come together. Every address begins with a promise: clear communication, dependable delivery, and a home made to last.', '{}'),
('mission', 'Our Mission', 'To elevate everyday living through responsible development, purposeful design, and service that puts homeowners first.', '{"points":["Build high-quality homes for modern Bangladeshi families","Maintain transparent communication at every stage","Choose durable materials and responsible construction methods","Create lasting relationships beyond handover"]}'),
('contact', 'Ways you can reach us', 'Speak with our property team about your next home or land partnership.', '{"email":"info@hbl.com.bd","phone":"+880 1700-000000","address":"Dhanmondi, Dhaka 1209, Bangladesh","whatsapp":"8801700000000"}');

INSERT INTO public.projects (title, slug, location, status, summary, description, image_key, amenities, facts, is_featured, sort_order) VALUES
('HBL Aurora', 'hbl-aurora', 'Dhanmondi, Dhaka', 'Ongoing', 'A calm, contemporary address shaped around light, greenery, and privacy.', 'HBL Aurora is a boutique urban residence with generous balconies, carefully planned circulation, and warm shared spaces for modern family life.', 'aurora', ARRAY['Rooftop garden','Residents lounge','24/7 security','Generator backup','Two elevators'], '{"apartments":"28","floors":"G + 9","size":"1,850–2,150 sft","handover":"December 2027"}', true, 1),
('HBL Niloy', 'hbl-niloy', 'Uttara, Dhaka', 'Upcoming', 'Refined city living with open views and efficient, elegant floor plans.', 'HBL Niloy pairs a crisp architectural profile with comfortable family apartments, secure parking, and a landscaped arrival court.', 'niloy', ARRAY['Landscaped court','Prayer space','Children’s play area','Fire safety system','Visitor parking'], '{"apartments":"36","floors":"G + 10","size":"1,650–1,950 sft","handover":"June 2028"}', true, 2),
('HBL Neer', 'hbl-neer', 'Bashundhara R/A, Dhaka', 'Completed', 'A peaceful residential retreat with contemporary detail and lasting materials.', 'Completed with an emphasis on natural ventilation, practical layouts, and enduring finishes, HBL Neer offers composed urban living.', 'aurora', ARRAY['Community hall','CCTV coverage','Water treatment','Rooftop seating'], '{"apartments":"24","floors":"G + 8","size":"1,700–2,000 sft","handover":"Completed 2025"}', true, 3),
('HBL Shurjo', 'hbl-shurjo', 'Mirpur DOHS, Dhaka', 'Ongoing', 'Bright, family-focused apartments in a connected neighborhood.', 'HBL Shurjo brings together efficient planning, generous daylight, and dependable building systems for effortless daily living.', 'niloy', ARRAY['Fitness room','Rooftop garden','Secure lobby','Generator backup'], '{"apartments":"32","floors":"G + 9","size":"1,550–1,850 sft","handover":"March 2027"}', false, 4);

INSERT INTO public.team_members (name, role, biography, sort_order) VALUES
('Ahsanul Haque', 'Managing Director', 'Guides HBL with a commitment to responsible growth, transparent partnerships, and homes that create long-term value.', 1),
('Farzana Rahman', 'Director, Design & Planning', 'Leads the design process with a focus on thoughtful layouts, enduring materials, and the everyday needs of residents.', 2),
('Mahmudul Hasan', 'Head of Engineering', 'Oversees construction quality, safety, and delivery through disciplined project controls and experienced site teams.', 3),
('Nusrat Jahan', 'Head of Customer Experience', 'Ensures every buyer receives clear guidance, timely communication, and dependable support from enquiry to handover.', 4);

INSERT INTO public.affiliations (name, sort_order) VALUES
('Bengal Cement', 1), ('Delta Steel', 2), ('Nexus Cables', 3), ('Ceramic House', 4), ('City Finance', 5), ('Elevate Systems', 6);