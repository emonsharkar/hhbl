ALTER TABLE public.team_members ADD COLUMN phone text;

UPDATE public.team_members SET phone = CASE name
  WHEN 'Ahsanul Haque' THEN '+880 1700-000101'
  WHEN 'Farzana Rahman' THEN '+880 1700-000102'
  WHEN 'Mahmudul Hasan' THEN '+880 1700-000103'
  WHEN 'Nusrat Jahan' THEN '+880 1700-000104'
  ELSE phone
END;