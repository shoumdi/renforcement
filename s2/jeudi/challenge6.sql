CREATE DATABASE challenge;

CREATE TABLE
    livres (
        id INT PRIMARY KEY AUTO_INCREMENT,
        titre VARCHAR(50) NOT NULL,
        prix Float,
        annee_publication DATE NOT NULL,
        editeur_id INT,
        genre_id INT,
        FOREIGN KEY (editeur_id) REFERENCES editeurs (id),
        FOREIGN KEY (genre_id) REFERENCES genres (id),
    )
CREATE TABLE
    editeurs (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nom nom VARCHAR(50) NOT NULL,
        pays nom VARCHAR(50) NOT NULL
    );

CREATE TABLE
    genres (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nom VARCHAR(50) NOT NULL
    );

CREATE TABLE
    ventes (
        id INT PRIMARY KEY AUTO_INCREMENT,
        livre_id INT,
        FOREIGN KEY (livre_id) REFERENCES livres (id),
        client VARCHAR(30),
        quantite INT NOT NULL,
        date_vente DATE DEFAULT (CURRENT_DATE)
    );

-- Chaque livre avec le nom de son éditeur et le nom de son genre (3 tables)
Select
    l.*,
    e.nom AS name,
    g.nom AS genre_name
FROM
    livres l
    INNER JOIN editeurs e on e.id = l.editeur_id
    INNER JOIN genres g ON g.id = l.genre_id;

-- Le nombre de livres par éditeur, trié du plus au moins prolifique
SELECT
    l.titre,
    e.nom,
    COUNT(e.id) AS count
FROM
    livres l
INNER JOIN editeurs e ON l.editeur_id=e.id
GROUP BY
    l.editeur_id
ORDER BY count,e.id ASC;


-- Le chiffre d'affaires par genre (jointure 3 tables avec calcul prix × quantité)
SELECT
	g.nom,
	l.prix * v.quantite AS ca
FROM
    livres l
INNER JOIN genres g ON l.genre_id=g.id
INNER JOIN ventes v ON v.livre_id=l.id
GROUP By g.nom


-- Les éditeurs qui n'ont aucun livre vendu (pense à comment trouver l'absence de correspondance)
SELECT e.nom,l.titre,COUNT(v.id) AS ventes_count FROM editeurs e 
INNER JOIN livres l ON e.id=l.editeur_id
LEFT JOIN ventes v ON v.livre_id=l.id
GROUP BY e.nom
HAVING ventes_count = 0

-- Le livre le plus vendu de chaque genre


-- Les clients qui ont acheté des livres de plus de 3 genres différents
SELECT v.client FROM ventes v
JOIN livres g ON v.livre_id = l.id
GROUP BY v.client
HAVING COUNT(DISTINCT l.genre_id) > 3

-- L'évolution mensuelle du chiffre d'affaires (regroupé par mois)

SELECT 
    DATE_FORMAT(v.date_vente, '%Y-%m') AS mois,
    SUM(l.prix * v.quantite) AS chiffre_affaires
FROM ventes v
JOIN livres l ON v.livre_id = l.id
GROUP BY mois
ORDER BY mois;

--Les livres publiés après 2020 dont le prix est supérieur au prix moyen de leur genre

SELECT l.titre, l.prix, l.genre_id
FROM livres l
WHERE l.annee_publication > 2020
AND l.prix > (
    SELECT AVG(l2.prix)
    FROM livres l2
    WHERE l2.genre_id = l.genre_id
);
