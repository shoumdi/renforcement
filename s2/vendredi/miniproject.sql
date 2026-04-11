--Script CREATE TABLE pour toutes les entités. 
--Données de test réalistes (10 clients, 20 chambres de 4 types, 15 réservations, 5 factures).
-- Index sur les colonnes pertinentes.


CREATE TABLE hotels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    address VARCHAR(255)
);

CREATE TABLE room_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    capacity INT,
    description TEXT
);

CREATE TABLE rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    number INT,
    status ENUM('AVAILABLE', 'OCCUPIED', 'MAINTENANCE'),
    price DECIMAL(10,2),
    hotel_id INT,
    type_id INT,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id)
        ON DELETE CASCADE,
    FOREIGN KEY (type_id) REFERENCES room_types(id)
        ON DELETE SET NULL
);

CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    email VARCHAR(150) UNIQUE
);

CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    start_date DATE,
    end_date DATE,
    status ENUM('PENDING', 'CONFIRMED', 'CANCELED'),
    client_id INT,
    room_id INT,
    FOREIGN KEY (client_id) REFERENCES clients(id)
        ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id)
        ON DELETE CASCADE
);

CREATE TABLE factures (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10,2),
    issue_date DATE,
    payment_date DATE,
    status ENUM('NOT_PAID', 'PAID'),
    reservation_id INT UNIQUE,
    FOREIGN KEY (reservation_id) REFERENCES reservations(id)
        ON DELETE CASCADE
);

CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10,2),
    description TEXT
);

CREATE TABLE reservation_service (
    reservation_id INT,
    service_id INT,
    PRIMARY KEY (reservation_id, service_id),
    FOREIGN KEY (reservation_id) REFERENCES reservations(id)
        ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id)
        ON DELETE CASCADE
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    review_date DATE,
    client_id INT,
    hotel_id INT,
    FOREIGN KEY (client_id) REFERENCES clients(id)
        ON DELETE CASCADE,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id)
        ON DELETE CASCADE
);

INSERT INTO hotels (name, address) VALUES
('Atlas Palace', 'Marrakech Centre'),
('Sahara Resort', 'Agadir Beach');

INSERT INTO room_types (name, capacity, description) VALUES
('Single', 1, 'Chambre simple pour une personne'),
('Double', 2, 'Chambre double avec lit double'),
('Suite', 4, 'Suite familiale luxueuse'),
('Deluxe', 3, 'Chambre deluxe avec vue');

INSERT INTO rooms (number, status, price, hotel_id, type_id) VALUES
(101, 'AVAILABLE', 50, 1, 1),
(102, 'OCCUPIED', 70, 1, 2),
(103, 'AVAILABLE', 120, 1, 3),
(104, 'MAINTENANCE', 90, 1, 4),
(105, 'AVAILABLE', 60, 1, 2),
(106, 'AVAILABLE', 55, 1, 1),
(107, 'OCCUPIED', 130, 1, 3),
(108, 'AVAILABLE', 95, 1, 4),
(109, 'AVAILABLE', 75, 1, 2),
(110, 'AVAILABLE', 50, 1, 1),
(201, 'AVAILABLE', 65, 2, 2),
(202, 'OCCUPIED', 150, 2, 3),
(203, 'AVAILABLE', 100, 2, 4),
(204, 'AVAILABLE', 55, 2, 1),
(205, 'MAINTENANCE', 80, 2, 2),
(206, 'AVAILABLE', 140, 2, 3),
(207, 'AVAILABLE', 95, 2, 4),
(208, 'OCCUPIED', 60, 2, 1),
(209, 'AVAILABLE', 70, 2, 2),
(210, 'AVAILABLE', 160, 2, 3);

INSERT INTO clients (first_name, last_name, email) VALUES
('Yassine', 'El Amrani', 'yassine@email.com'),
('Sara', 'Benali', 'sara@email.com'),
('Omar', 'Tazi', 'omar@email.com'),
('Lina', 'Kabbaj', 'lina@email.com'),
('Mehdi', 'Alaoui', 'mehdi@email.com'),
('Salma', 'Idrissi', 'salma@email.com'),
('Karim', 'Bennani', 'karim@email.com'),
('Nadia', 'Fassi', 'nadia@email.com'),
('Hicham', 'Ouazzani', 'hicham@email.com'),
('Imane', 'Zerouali', 'imane@email.com');

INSERT INTO reservations (start_date, end_date, status, client_id, room_id) VALUES
('2026-04-01', '2026-04-05', 'CONFIRMED', 1, 2),
('2026-04-02', '2026-04-06', 'CONFIRMED', 2, 3),
('2026-04-03', '2026-04-04', 'CANCELED', 3, 1),
('2026-04-05', '2026-04-10', 'CONFIRMED', 4, 7),
('2026-04-06', '2026-04-08', 'PENDING', 5, 6),
('2026-04-07', '2026-04-12', 'CONFIRMED', 6, 8),
('2026-04-08', '2026-04-15', 'CONFIRMED', 7, 12),
('2026-04-09', '2026-04-11', 'PENDING', 8, 13),
('2026-04-10', '2026-04-14', 'CONFIRMED', 9, 14),
('2026-04-11', '2026-04-13', 'CONFIRMED', 10, 18),
('2026-04-12', '2026-04-16', 'CONFIRMED', 1, 19),
('2026-04-13', '2026-04-17', 'PENDING', 2, 20),
('2026-04-14', '2026-04-18', 'CONFIRMED', 3, 9),
('2026-04-15', '2026-04-20', 'CONFIRMED', 4, 10),
('2026-04-16', '2026-04-22', 'PENDING', 5, 11);

INSERT INTO factures (amount, issue_date, payment_date, status, reservation_id) VALUES
(320, '2026-04-01', '2026-04-02', 'PAID', 1),
(480, '2026-04-02', NULL, 'NOT_PAID', 2),
(600, '2026-04-05', '2026-04-06', 'PAID', 4),
(300, '2026-04-07', NULL, 'NOT_PAID', 6),
(750, '2026-04-10', '2026-04-11', 'PAID', 9);

INSERT INTO services (name, price, description) VALUES
('Spa', 50, 'Accès au spa'),
('Breakfast', 10, 'Petit déjeuner'),
('Airport Transfer', 30, 'Navette aéroport'),
('Laundry', 15, 'Service de blanchisserie'),
('Gym', 20, 'Accès à la salle de sport');

INSERT INTO reservation_service (reservation_id, service_id) VALUES
(1, 1),
(1, 2),
(2, 2),
(4, 3),
(6, 1),
(7, 5),
(9, 2),
(10, 4);

INSERT INTO reviews (rating, comment, review_date, client_id, hotel_id) VALUES
(5, 'Excellent séjour', '2026-04-05', 1, 1),
(4, 'Très bon service', '2026-04-06', 2, 1),
(3, 'Correct', '2026-04-07', 3, 2),
(5, 'Magnifique hôtel', '2026-04-08', 4, 2),
(2, 'Peut mieux faire', '2026-04-09', 5, 1);

-- Taux d'occupation par type de chambre sur un mois donné
SELECT rt.name,MONTH(r.start_date) as month,COUNT(MONTH(r.start_date)) as taux FROM reservations r
INNER JOIN rooms room ON room.id=r.room_id 
INNER JOIN room_types rt ON rt.id=room.type_id
GROUP BY month

-- Clients fidèles (plus de 3 réservations)
SELECT h.name,c.first_name,c.last_name,COUNT(c.id) as res_number FROM clients c
INNER JOIN reservations r ON r.client_id = c.id
INNER JOIN rooms room ON r.room_id = room.id
INNER JOIN hotels h ON h.id=room.hotel_id
GROUP BY h.name,c.first_name,c.last_name
HAVING res_number > 3

-- Chambres disponibles entre 2 dates (la requête la plus complexe : une chambre est disponible si elle n'a aucune réservation qui chevauche les dates demandées)

SELECT r.id,r.number FROM rooms r
WHERE r.id NOT IN(
	SELECT r1.room_id FROM reservations r1
    WHERE r1.start_date < '2026-01-08' AND r1.end_date > '2026-01-05'
)
-- Revenu moyen par client

SELECT 
    AVG(client_revenue) AS average_per_client
FROM (
    SELECT 
        c.id,
        COALESCE(SUM(f.amount), 0) AS client_revenue
    FROM clients c
    LEFT JOIN reservations r ON r.client_id = c.id
    LEFT JOIN factures f ON f.reservation_id = r.id
    GROUP BY c.id
) AS per_client;

-- top 5 clients

SELECT 
    c.id,
    c.first_name,
    c.last_name,
    SUM(f.amount) AS total_spent
FROM clients c
JOIN reservations r ON r.client_id = c.id
JOIN factures f ON f.reservation_id = r.id
GROUP BY c.id, c.first_name, c.last_name, c.email
ORDER BY total_spent DESC
LIMIT 5;