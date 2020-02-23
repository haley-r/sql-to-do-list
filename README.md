# SQL To-Do App

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

- `GET /tasks/:path` returns all tasks, in the order specified (or if none is specified, from first created to latest created)

- `POST /tasks` takes user input from the DOM and sends a task object to the database.

- `PUT /tasks/<id>` updates the task's completion status to 'true', which changes its class name to 'completed-true', which changes how it is displayed in the browser.

- `DELETE /tasks/<id>` Deletes a specific task, identified with a data attribute connected to the delete button clicked.

