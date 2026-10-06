INSERT INTO public.testimonials (name, relationship, quote, sort_order, is_published)
SELECT * FROM (VALUES
  ('A sample HBL homeowner', 'Resident, Dhanmondi', 'The process felt transparent and considered from our first meeting through every project update.', 1, true),
  ('A sample landowner', 'Development partner, Dhaka', 'HBL approached our partnership with patience, professional clarity, and genuine respect for the long term.', 2, true),
  ('A sample apartment buyer', 'Future resident, Uttara', 'The planning, natural light, and attention to everyday family life made the residence stand apart.', 3, true)
) AS seed(name, relationship, quote, sort_order, is_published)
WHERE NOT EXISTS (SELECT 1 FROM public.testimonials);

INSERT INTO public.faqs (question, answer, category, sort_order, is_published)
SELECT * FROM (VALUES
  ('How can I arrange a project visit?', 'Send an inquiry through the website or call our team. We will confirm a suitable time and connect you with the project representative.', 'Projects', 1, true),
  ('Can I request plans and specifications?', 'Yes. Available floor plans, specifications, payment information, and current construction status can be shared after an initial conversation.', 'Projects', 2, true),
  ('Does HBL work with landowners?', 'Yes. Our team evaluates suitable land partnership opportunities in Dhaka and presents a clear development approach for discussion.', 'Land partnership', 3, true),
  ('What support is available after handover?', 'Our relationship continues after handover through clear documentation, building guidance, and responsive support for covered matters.', 'Customer care', 4, true)
) AS seed(question, answer, category, sort_order, is_published)
WHERE NOT EXISTS (SELECT 1 FROM public.faqs);