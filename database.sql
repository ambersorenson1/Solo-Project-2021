
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "public.user" (
	"user_id" SERIAL,
	"username" VARCHAR (80) UNIQUE NOT NULL,
	"password" VARCHAR (1000) NOT NULL,
	"role" integer NOT NULL,
	"ref" VARCHAR (80),
	CONSTRAINT "users_pk" PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "public.kids" (
	"id" SERIAL NOT NULL,
	"childsName" VARCHAR (1000) NOT NULL,
	"diagnosis" VARCHAR (1000) NOT NULL,
	"current sypmtoms" VARCHAR (1000) NOT NULL,
	"ref" VARCHAR (1000) NOT NULL
) WITH (
  OIDS=FALSE
);


CREATE TABLE "public.kids_medications" (
	"medicationName" VARCHAR (1000) NOT NULL,
	"meds_id" SERIAL NOT NULL,
	"dosage" VARCHAR (1000) NOT NULL,
	"timeOfMeds" VARCHAR (1000) NOT NULL,
	"kids_id" integer NOT NULL,
	"ref" VARCHAR (1000) NOT NULL,
	CONSTRAINT "kids_medications_pk" PRIMARY KEY ("meds_id")
) WITH (
  OIDS=FALSE
);
