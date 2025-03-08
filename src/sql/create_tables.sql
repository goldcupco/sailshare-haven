
-- Create yacht_listings table
CREATE TABLE public.yacht_listings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    length_ft NUMERIC NOT NULL,
    year_built INTEGER,
    pricePerDay NUMERIC NOT NULL,
    pricePerWeek NUMERIC,
    instantBook BOOLEAN DEFAULT false,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL,
    lat NUMERIC,
    lng NUMERIC,
    rating NUMERIC,
    reviews_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    main_image_url TEXT
);

-- Create yacht_images table
CREATE TABLE public.yacht_images (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    yacht_id UUID NOT NULL REFERENCES public.yacht_listings(id),
    image_url TEXT NOT NULL,
    is_main BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    caption TEXT
);

-- Create yacht_amenities table
CREATE TABLE public.yacht_amenities (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    yacht_id UUID NOT NULL REFERENCES public.yacht_listings(id),
    amenity TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create yacht_listings_with_amenities view
CREATE OR REPLACE VIEW public.yacht_listings_with_amenities AS
SELECT 
    y.id,
    y.name,
    y.description,
    y.type,
    y.capacity,
    y.length_ft,
    y.year_built,
    y.pricePerDay,
    y.pricePerWeek,
    y.instantBook,
    y.city,
    y.state,
    y.country,
    y.lat,
    y.lng,
    y.rating,
    y.reviews_count,
    y.created_at,
    y.updated_at,
    y.main_image_url,
    ARRAY_AGG(a.amenity) AS amenities
FROM 
    public.yacht_listings y
LEFT JOIN 
    public.yacht_amenities a ON y.id = a.yacht_id
GROUP BY 
    y.id;
