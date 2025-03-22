CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"usename" varchar(50) NOT NULL,
	"email" varchar(255) NOT NULL,
	"hashed_password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"display_name" varchar(50),
	"bio" text,
	CONSTRAINT "users_usename_unique" UNIQUE("usename"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
