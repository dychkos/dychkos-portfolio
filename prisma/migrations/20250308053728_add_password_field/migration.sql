-- Add extension if not already available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Add column with UUID-based passwords
ALTER TABLE "User" ADD COLUMN "password" TEXT;
UPDATE "User" SET "password" = CONCAT('Temp_', uuid_generate_v4()::text, '_2025');
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;