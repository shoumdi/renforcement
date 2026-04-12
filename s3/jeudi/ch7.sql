
-- 1. Gares desservies par TGV Paris-Lyon

SELECT g.nom AS gare, g.ville, a.heure_passage
FROM lignes l
JOIN arrets a ON l.id = a.ligne_id
JOIN gares g ON g.id = a.gare_id
WHERE l.nom = 'TGV Paris-Lyon'
ORDER BY a.ordre;



-- 2. Nombre de lignes par gare

SELECT g.id, g.nom, COUNT(DISTINCT a.ligne_id) AS nb_lignes
FROM gares g
LEFT JOIN arrets a ON g.id = a.gare_id
GROUP BY g.id, g.nom
ORDER BY nb_lignes DESC;

-- Gare la plus connectée
SELECT g.id, g.nom, COUNT(DISTINCT a.ligne_id) AS nb_lignes
FROM gares g
LEFT JOIN arrets a ON g.id = a.gare_id
GROUP BY g.id, g.nom
ORDER BY nb_lignes DESC
LIMIT 1;



-- 3. Chiffre d'affaires par ligne

SELECT l.id, l.nom, SUM(b.prix) AS chiffre_affaires
FROM lignes l
JOIN billets b ON l.id = b.ligne_id
GROUP BY l.id, l.nom
ORDER BY chiffre_affaires DESC;



-- 4. Gares sans ligne TGV

SELECT g.id, g.nom, g.ville
FROM gares g
WHERE g.id NOT IN (
    SELECT a.gare_id
    FROM arrets a
    JOIN lignes l ON l.id = a.ligne_id
    WHERE l.type = 'TGV'
);



-- 5. Voyageur qui a le plus dépensé ce mois

SELECT v.id, v.nom, SUM(b.prix) AS total_depense
FROM voyageurs v
JOIN billets b ON v.id = b.voyageur_id
WHERE DATE_FORMAT(b.date_voyage, '%Y-%m') = DATE_FORMAT(CURRENT_DATE, '%Y-%m')
GROUP BY v.id, v.nom
ORDER BY total_depense DESC
LIMIT 1;



-- 6. Trajet le plus emprunté
SELECT 
    g1.nom AS gare_depart,
    g2.nom AS gare_arrivee,
    COUNT(*) AS nb_voyages
FROM billets b
JOIN gares g1 ON b.gare_depart_id = g1.id
JOIN gares g2 ON b.gare_arrivee_id = g2.id
GROUP BY b.gare_depart_id, b.gare_arrivee_id, g1.nom, g2.nom
ORDER BY nb_voyages DESC
LIMIT 1;


-- 7. Revenu moyen par voyageur par région

SELECT 
    t.region,
    AVG(t.depense_par_voyageur) AS revenu_moyen
FROM (
    SELECT 
        v.id,
        g.region,
        SUM(b.prix) AS depense_par_voyageur
    FROM voyageurs v
    JOIN billets b ON v.id = b.voyageur_id
    JOIN gares g ON b.gare_depart_id = g.id
    GROUP BY v.id, g.region
) t
GROUP BY t.region;