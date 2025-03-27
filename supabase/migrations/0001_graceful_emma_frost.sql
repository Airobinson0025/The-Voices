CREATE TABLE "tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token" varchar(255) NOT NULL,
	"type" varchar(50) DEFAULT 'access' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL,
	"is_revoked" boolean DEFAULT false NOT NULL,
	"revoked_at" timestamp,
	"last_used_at" timestamp,
	"user_agent" text,
	"ip_address" varchar(45),
	CONSTRAINT "tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;