CREATE TABLE tasks(
		"id" SERIAL PRIMARY KEY,
		"description" VARCHAR (300) NOT NULL,
		"completed" BOOLEAN NOT NULL DEFAULT false,
		"category" VARCHAR (50) DEFAULT 'general',
		"priority_level" INTEGER DEFAULT 3,
		"created" DATE,
		"deadline" DATE
);

INSERT INTO tasks ("description", "category", "priority_level")
VALUES ('take the cats on a walk','health', 1),
('file taxes','financial', 5),
('read up on touchscreen media queries','coding', 4),
('frame artwork from friends','household', 3),
('call mom', 'family', 2),
('make the logo bigger','work', 4),
('set the world record for largest Jello-Fest','recreation', 1);

