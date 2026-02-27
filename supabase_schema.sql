-- Offlora Supabase SQL Schema

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ENUMS
CREATE TYPE user_role AS ENUM ('ADMIN', 'SUPER_ADMIN');
CREATE TYPE pros_cons_type AS ENUM ('PRO', 'CON');

-- 1. Users Table
CREATE TABLE public."User" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "email" TEXT UNIQUE NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Admins Table
CREATE TABLE public."Admin" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "email" TEXT UNIQUE NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" user_role DEFAULT 'ADMIN'::user_role NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. OTP Sessions Table
CREATE TABLE public."OtpSession" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "verified" BOOLEAN DEFAULT false NOT NULL
);

-- 4. Categories Table
CREATE TABLE public."Category" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL
);

-- 5. Products Table
CREATE TABLE public."Product" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL,
    "price" TEXT,
    "affiliateLink" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "isPopular" BOOLEAN DEFAULT false NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "categoryId" UUID NOT NULL REFERENCES public."Category"(id) ON DELETE RESTRICT
);

-- 6. Product Images Table
CREATE TABLE public."ProductImage" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "url" TEXT NOT NULL,
    "productId" UUID NOT NULL REFERENCES public."Product"(id) ON DELETE CASCADE
);

-- 7. Pros & Cons Table
CREATE TABLE public."ProsCons" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "type" pros_cons_type NOT NULL,
    "text" TEXT NOT NULL,
    "productId" UUID NOT NULL REFERENCES public."Product"(id) ON DELETE CASCADE
);

-- 8. Blogs Table
CREATE TABLE public."Blog" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "title" TEXT NOT NULL,
    "slug" TEXT UNIQUE NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "categoryId" UUID NOT NULL REFERENCES public."Category"(id) ON DELETE RESTRICT
);

-- 9. Analytics Events Table
CREATE TABLE public."AnalyticsEvent" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "eventType" TEXT NOT NULL,
    "source" TEXT,
    "timestamp" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "userId" UUID REFERENCES public."User"(id) ON DELETE SET NULL,
    "productId" UUID REFERENCES public."Product"(id) ON DELETE SET NULL,
    "url" TEXT
);

-- 10. Affiliate Clicks Table
CREATE TABLE public."AffiliateClick" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "source" TEXT,
    "clickedAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "userId" UUID REFERENCES public."User"(id) ON DELETE SET NULL,
    "productId" UUID NOT NULL REFERENCES public."Product"(id) ON DELETE CASCADE
);

-- ADD INDEXES FOR PERFORMANCE
CREATE INDEX idx_user_email ON public."User"("email");
CREATE INDEX idx_product_slug ON public."Product"("slug");
CREATE INDEX idx_blog_slug ON public."Blog"("slug");
CREATE INDEX idx_otpsession_email_otp ON public."OtpSession"("email", "otp");
