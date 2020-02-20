# SQL To-Do App
===

This full-stack to-do list application allows users to input and sort by multiple parameters tasks which can be marked as complete or deleted with buttons. The task, including its completion status, is stored in a database accessed by the DOM with jQuery, Ajax, and database queries. This weekend project was a chance to practice requests/queries, git branching, and CSS features.

## Technologies Used

- jQuery
- SQL
- Node
- Express
- HTML/CSS

## Dependencies
- body-parser
- express
- pg

## Database Setup

```SQL
-- create table
CREATE TABLE tasks(
		"id" SERIAL PRIMARY KEY,
		"description" VARCHAR (300) NOT NULL,
		"completed" BOOLEAN NOT NULL DEFAULT false,
		"category" VARCHAR (50) DEFAULT 'general',
		"priority_level" INTEGER DEFAULT 3,
		"created" DATE,
		"deadline" DATE
);

-- Add some data
INSERT INTO tasks ("description", "category", "priority_level")
VALUES ('take the cats on a walk','health', 1),
('file taxes','financial', 5),
('read up on touchscreen media queries','coding', 4),
('frame artwork from friends','household', 3),
('call mom', 'family', 2),
('make the logo bigger','work', 4),
('set the world record for largest Jello-Fest','recreation', 1);


```

## What it does:

- `GET /treats` returns all treats from the database.

- `DELETE /treats/<id>` Deletes a specific treat. The Mode Toggle button in the interface will display the delete button for each treat.

- `POST /treats` expects a treat name, description and link to a url image. There are images provided in `/server/public/assets`, or the user can enter a url to web image.

- `PUT /treats/<id>` updates the treat description (the edit button is also displayed with the Mode Toggle button).


