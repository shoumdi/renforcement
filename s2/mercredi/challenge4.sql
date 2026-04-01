CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE students(
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE teachers(
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE categories(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE cours(
    id INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(50) NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    categorie_id INT,
    FOREIGN KEY (categorie_id) REFERENCES categories(id)
);



CREATE TABLE avis(
    id INT PRIMARY KEY AUTO_INCREMENT,
    rate Float,
    comment TEXT NOT NULL,
    user_id INT,
    cours_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (cours_id) REFERENCES cours(id)
);

CREATE TABLE inscriptions(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    cours_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (cours_id) REFERENCES cours(id)
);

CREATE TABLE modules(
    id INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(50) NOT NULL,
    cours_id INT,
    FOREIGN KEY (cours_id) REFERENCES cours(id)
);

CREATE TABLE lecons(
    id INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(50) NOT NULL,
    module_id INT,
    FOREIGN KEY (module_id) REFERENCES lecons(id)
);