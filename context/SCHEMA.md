# Database Schema & Architecture

## Overview
The application uses a PostgreSQL database hosted on Supabase, managed via Prisma ORM. The schema is designed to support the CMS, admissions, and future parent portal capabilities.

## Prisma Schema (`schema.prisma`)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// ------------------------------------------------------
// Core Application Data
// ------------------------------------------------------

/// Represents an incoming admission application from a parent.
model Application {
  id          String   @id @default(cuid())
  parentName  String
  email       String
  phone       String
  childName   String
  childAge    Int
  
  status      ApplicationStatus @default(PENDING)
  notes       String?
  
  consentGiven Boolean @default(true) // Required by PDPA
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum ApplicationStatus {
  PENDING
  REVIEWING
  ACCEPTED
  REJECTED
}

/// Dynamic pages managed by Payload CMS
model Page {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  content     Json     // Block-based content from CMS
  isPublished Boolean  @default(false)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

/// Academic Programs & Curriculums with Thai Baht (THB) Tuition Structure
model Program {
  id               String   @id @default(cuid())
  slug             String   @unique
  title            String   // Stored bilingually in Payload
  level            String   // kindergarten, primary, secondary, english-program
  tuitionFee       Int      // Base tuition fee in Thai Baht (THB, ฿)
  billingInterval  String   // term, year, month
  additionalFees   Json?    // Array of itemized fees in THB
  summary          String?
  syllabusUrl      String?
  status           String   @default("published")
  
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}

/// Announcements and news articles
model Announcement {
  id          String   @id @default(cuid())
  title       String
  excerpt     String?
  content     Json
  publishedAt DateTime?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Security & RLS Policies (Supabase)
Because we are utilizing Prisma as our primary data access layer via a secure backend server (Next.js Server Actions/API routes) and Payload CMS, **Row Level Security (RLS) is currently disabled/bypassed** for the service role key. 

If future client-side direct database access is implemented (e.g., via Supabase JS client for a Parent Portal), RLS policies must be explicitly defined:
1. **Public:** Cannot read or write `Application` table. Can read published `Page` and `Announcement` tables.
2. **Authenticated Parent:** Can read/update only their own `Application` based on auth UUID.

## Migrations Strategy
- Use `npx prisma migrate dev` during local development to generate SQL migration files.
- Use `npx prisma migrate deploy` during the CI/CD pipeline to safely apply schema changes to the production Supabase database.
- Never manually modify the database schema via the Supabase Dashboard; always use Prisma to maintain a single source of truth.
