
# SQL Scripts for Yacht Charter Application

This directory contains SQL scripts used to set up and populate the database for the Yacht Charter application.

## Files

- **create_tables.sql**: Contains DDL (Data Definition Language) statements to create all tables and views used by the application.
- **sample_data.sql**: Contains DML (Data Manipulation Language) statements to populate the tables with sample yacht data.

## Tables

The database schema consists of the following tables:

1. **yacht_listings**: Stores the main information about yacht listings including name, description, type, capacity, price, etc.
2. **yacht_images**: Stores images associated with each yacht, including flags for main images and sort order.
3. **yacht_amenities**: Stores the amenities available for each yacht.

## Views

The database schema includes the following views:

1. **yacht_listings_with_amenities**: A view that combines yacht_listings with their associated amenities, aggregating amenities as an array.

## How to Run

These scripts can be executed in the Supabase SQL Editor or using any PostgreSQL client connected to your Supabase database.

### Execution Order

When setting up a new database, execute the scripts in the following order:

1. `create_tables.sql`
2. `sample_data.sql`

## Notes

- These scripts include Row Level Security (RLS) policies to secure the data appropriately.
- The sample data includes images from Unsplash, which are freely available but should be replaced with your own images in a production environment.
