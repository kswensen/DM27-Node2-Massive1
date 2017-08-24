DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name TEXT,
    age INTEGER,
    country VARCHAR(80)
);

INSERT INTO users
(name, age, country)
VALUES
('John', 24, 'England'),
('Jacob', 18, 'USA'),
('Juan', 23, 'Mexico'),
('Susan', 30, 'USA'),
('Finn', 22, 'Finland');
