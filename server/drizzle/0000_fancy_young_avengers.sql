CREATE SCHEMA "goal-keeper";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "goal-keeper"."users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "goal-keeper"."users" ("created_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "updated_at_idx" ON "goal-keeper"."users" ("updated_at");