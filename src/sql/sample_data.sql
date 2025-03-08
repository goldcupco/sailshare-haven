
-- Insert sample yacht listings
INSERT INTO public.yacht_listings (
    name, 
    description, 
    type, 
    capacity, 
    length_ft, 
    year_built, 
    pricePerDay,
    pricePerWeek,
    instantBook, 
    city, 
    state, 
    country, 
    lat, 
    lng, 
    rating, 
    reviews_count, 
    main_image_url
) VALUES 
(
    'Oceanic Splendor',
    'Experience luxury on the water with this stunning yacht. Perfect for day cruises and special events.',
    'Motor Yacht',
    12,
    65,
    2020,
    1500,
    9000,
    true,
    'Miami',
    'Florida',
    'USA',
    25.7617,
    -80.1918,
    4.9,
    48,
    'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
),
(
    'Azure Dreams',
    'Sleek and modern yacht perfect for exploring coastal regions and enjoying the open water.',
    'Sailing Yacht',
    8,
    45,
    2019,
    900,
    5400,
    false,
    'San Diego',
    'California',
    'USA',
    32.7157,
    -117.1611,
    4.7,
    35,
    'https://images.unsplash.com/photo-1621252179027-9262b9f40844?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
),
(
    'Horizon Chaser',
    'Elegant and spacious yacht offering the ultimate luxury experience on the water.',
    'Catamaran',
    10,
    55,
    2021,
    1200,
    7200,
    true,
    'West Palm Beach',
    'Florida',
    'USA',
    26.7153,
    -80.0534,
    4.8,
    42,
    'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80'
),
(
    'Crystal Waters',
    'Luxury yacht perfect for special occasions and unforgettable experiences on the water.',
    'Motor Yacht',
    15,
    75,
    2022,
    2000,
    12000,
    false,
    'Marina del Rey',
    'California',
    'USA',
    33.9802,
    -118.4517,
    5.0,
    52,
    'https://images.unsplash.com/photo-1616688311293-ed53caec04b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80'
);

-- Insert images for each yacht
-- Oceanic Splendor
WITH yacht AS (SELECT id FROM public.yacht_listings WHERE name = 'Oceanic Splendor' LIMIT 1)
INSERT INTO public.yacht_images (yacht_id, image_url, is_main, sort_order) VALUES
((SELECT id FROM yacht), 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', true, 0),
((SELECT id FROM yacht), 'https://images.unsplash.com/photo-1609436132311-e4b0c9302506?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', false, 1),
((SELECT id FROM yacht), 'https://images.unsplash.com/photo-1569263900347-06b1e8c825ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80', false, 2);

-- Azure Dreams
WITH yacht AS (SELECT id FROM public.yacht_listings WHERE name = 'Azure Dreams' LIMIT 1)
INSERT INTO public.yacht_images (yacht_id, image_url, is_main, sort_order) VALUES
((SELECT id FROM yacht), 'https://images.unsplash.com/photo-1621252179027-9262b9f40844?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', true, 0),
((SELECT id FROM yacht), 'https://images.unsplash.com/photo-1552074284-5e84d87aee4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', false, 1),
((SELECT id FROM yacht), 'https://images.unsplash.com/photo-1575633106061-deeca0c7a6cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1121&q=80', false, 2);

-- Horizon Chaser
WITH yacht AS (SELECT id FROM public.yacht_listings WHERE name = 'Horizon Chaser' LIMIT 1)
INSERT INTO public.yacht_images (yacht_id, image_url, is_main, sort_order) VALUES
((SELECT id FROM yacht), 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80', true, 0),
((SELECT id FROM yacht), 'https://images.unsplash.com/photo-1566847438217-76e82d383f84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80', false, 1),
((SELECT id FROM yacht), 'https://images.unsplash.com/photo-1565620731358-e8c038abc8d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', false, 2);

-- Crystal Waters
WITH yacht AS (SELECT id FROM public.yacht_listings WHERE name = 'Crystal Waters' LIMIT 1)
INSERT INTO public.yacht_images (yacht_id, image_url, is_main, sort_order) VALUES
((SELECT id FROM yacht), 'https://images.unsplash.com/photo-1616688311293-ed53caec04b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80', true, 0),
((SELECT id FROM yacht), 'https://images.unsplash.com/photo-1626768614296-7a75bb5afa5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80', false, 1),
((SELECT id FROM yacht), 'https://images.unsplash.com/photo-1628690622682-165b50913fb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', false, 2);

-- Insert amenities for each yacht
-- Oceanic Splendor
WITH yacht AS (SELECT id FROM public.yacht_listings WHERE name = 'Oceanic Splendor' LIMIT 1)
INSERT INTO public.yacht_amenities (yacht_id, amenity) VALUES
((SELECT id FROM yacht), 'WiFi'),
((SELECT id FROM yacht), 'Air Conditioning'),
((SELECT id FROM yacht), 'Kitchen'),
((SELECT id FROM yacht), 'Sound System'),
((SELECT id FROM yacht), 'Swimming Platform'),
((SELECT id FROM yacht), 'Jacuzzi');

-- Azure Dreams
WITH yacht AS (SELECT id FROM public.yacht_listings WHERE name = 'Azure Dreams' LIMIT 1)
INSERT INTO public.yacht_amenities (yacht_id, amenity) VALUES
((SELECT id FROM yacht), 'WiFi'),
((SELECT id FROM yacht), 'Kitchen'),
((SELECT id FROM yacht), 'Sound System'),
((SELECT id FROM yacht), 'Swimming Platform'),
((SELECT id FROM yacht), 'Snorkeling Gear');

-- Horizon Chaser
WITH yacht AS (SELECT id FROM public.yacht_listings WHERE name = 'Horizon Chaser' LIMIT 1)
INSERT INTO public.yacht_amenities (yacht_id, amenity) VALUES
((SELECT id FROM yacht), 'WiFi'),
((SELECT id FROM yacht), 'Air Conditioning'),
((SELECT id FROM yacht), 'Kitchen'),
((SELECT id FROM yacht), 'Sound System'),
((SELECT id FROM yacht), 'Swimming Platform'),
((SELECT id FROM yacht), 'Water Toys');

-- Crystal Waters
WITH yacht AS (SELECT id FROM public.yacht_listings WHERE name = 'Crystal Waters' LIMIT 1)
INSERT INTO public.yacht_amenities (yacht_id, amenity) VALUES
((SELECT id FROM yacht), 'WiFi'),
((SELECT id FROM yacht), 'Air Conditioning'),
((SELECT id FROM yacht), 'Full Kitchen'),
((SELECT id FROM yacht), 'Premium Sound System'),
((SELECT id FROM yacht), 'Swimming Platform'),
((SELECT id FROM yacht), 'Jacuzzi'),
((SELECT id FROM yacht), 'Water Slide');
