CREATE TABLE IF NOT EXISTS persons (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL
);

INSERT INTO persons (first_name, last_name) VALUES
('Mickey', 'Mouse'),
('Donald', 'Duck'),
('Minnie', 'Mouse'),
('Daisy', 'Duck'),
('Pluto', 'Dog'),
('Chip', 'Chipmuck'),
('Dale', 'Chipmuck'),
('Olive', 'Oil'),
('Bruce', 'Wayne'),
('Peter', 'Parker'),
('Clark', 'Kent'),
('Loise', 'Lane'),
('Luke', 'Skywalker');