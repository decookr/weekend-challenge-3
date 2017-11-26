CREATE TABLE todo_list (
	id SERIAL PRIMARY KEY, 	
	item VARCHAR(80) NOT NULL,
	completed VARCHAR(1) NOT NULL);


INSERT INTO todo_list ("item", "completed")
VALUES ('Plan out weekend challenge', 'Y'),
('Eat lots of turkey', 'Y'),
('Drink more coffee', 'Y'),
('Ace weekend challenge', 'N'),
('Buy Xmas Presents', 'N'),
('Graduate from Prime', 'N'),
('Get a job in web dev', 'N');

SELECT * FROM todo_list ORDER BY id;